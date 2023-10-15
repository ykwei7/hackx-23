from flask import Blueprint, request, jsonify
from models import Bicycle, User
from db import db

import os
import uuid

from pywebpush import webpush, WebPushException

from datetime import datetime, timedelta

from azure.storage.blob import (
    BlobServiceClient,
    BlobSasPermissions,
    generate_blob_sas,
)

from db import sas_url, container_name

from routes.reports import decode_coord

bp = Blueprint("bicycles", __name__, url_prefix="/bicycles")


@bp.route("/", methods=["POST"])
def add_bicycle():
    form = request.form.to_dict()
    user_id = form.get("user_id")
    name = form.get("name")
    brand = form.get("brand")
    model = form.get("model")
    description = form.get("description")
    fileData = request.files.get("image", None)
    last_seen_lat = form.get("last_seen_lat", None)
    last_seen_lon = form.get("last_seen_lon", None)
    device_id = form.get("device_id", "")

    # Check if the user exists
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    bike_id = uuid.uuid4()

    # Convert the UUID to a string if needed
    bike_id = str(bike_id)
    # Create a new bicycle
    new_bicycle = Bicycle(
        id=bike_id,
        user_id=user_id,
        name=name,
        brand=brand,
        model=model,
        description=description,
        last_seen_lat=last_seen_lat,
        last_seen_lon=last_seen_lon,
        device_id=device_id,
    )

    blob_service_client = BlobServiceClient.from_connection_string(sas_url)
    container_client = blob_service_client.get_container_client(container_name)
    blob_filename = str(bike_id)
    blob_client = container_client.get_blob_client(blob_filename)
    blob_client.upload_blob(fileData)

    sas_token = generate_blob_sas(
        container_name=container_name,
        blob_name=blob_filename,
        account_name=blob_service_client.account_name,
        account_key=blob_service_client.credential.account_key,  # or you can use a token here
        permission=BlobSasPermissions(read=True),
        expiry=datetime.utcnow()
        + timedelta(hours=10000),  # Set the expiration time as needed
    )

    blob_url = f"{blob_service_client.url}{container_name}/{blob_filename}?{sas_token}"

    new_bicycle.image_url = blob_url
    db.session.add(new_bicycle)
    db.session.commit()

    return jsonify({"message": "Bicycle added successfully"}), 201


@bp.route("/", methods=["GET"])
def get_all_bicycles():
    # if limit query param is not present or is of non-int type, default of 10 is used
    num_bikes = request.args.get("limit", default=50, type=int)
    if num_bikes <= 0:
        return jsonify({"error": "limit query parameter should be positive"}), 400

    userId = request.args.get("user_id", default="", type=str)
    try:
        if not userId:
            # return jsonify({"error": "userId should be specified"}), 400
            bicycles = Bicycle.query.limit(num_bikes).all()
        else:
            kwargs = {"user_id": userId}
            bicycles = Bicycle.query.filter_by(**kwargs).limit(num_bikes).all()

        bicycles_data = [
            {
                "id": b.id,
                "user_id": b.user_id,
                "name": b.name,
                "brand": b.brand,
                "model": b.model,
                "description": b.description,
                "last_seen_lat": b.last_seen_lat,
                "last_seen_lon": b.last_seen_lon,
                "is_stolen": b.is_stolen,
                "image_url": b.image_url,
                "device_id": b.device_id,
            }
            for b in bicycles
        ]
        return jsonify(bicycles_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Define a route to delete a bicycle by ID
@bp.route("/<string:bicycle_id>", methods=["DELETE"])
def delete_bicycle(bicycle_id):
    bicycle = Bicycle.query.get(bicycle_id)
    if not bicycle:
        return jsonify({"message": "Bicycle not found"}), 404

    db.session.delete(bicycle)
    db.session.commit()

    return jsonify({"message": "Bicycle deleted successfully"}), 200


# Define a route to update a bicycle by ID
@bp.route("/<string:bicycle_id>", methods=["PUT"])
def update_bicycle(bicycle_id):
    bicycle = Bicycle.query.get(bicycle_id)
    if not bicycle:
        return jsonify({"message": "Bicycle not found"}), 404

    data = request.json  # Assuming you're sending JSON data in the request

    # Update bicycle properties
    bicycle.name = data.get("name", bicycle.name)
    bicycle.brand = data.get("brand", bicycle.brand)
    bicycle.model = data.get("model", bicycle.model)
    bicycle.description = data.get("description", bicycle.description)
    bicycle.last_seen_lat = data.get("last_seen_lat", bicycle.last_seen_lat)
    bicycle.last_seen_lon = data.get("last_seen_lon", bicycle.last_seen_lon)

    isStolenPrev = bicycle.is_stolen
    bicycle.is_stolen = data.get("is_stolen", bicycle.is_stolen)

    db.session.commit()

    # Check if there is a state change
    # false->true and true-> false
    if isStolenPrev is not bicycle.is_stolen:
        userRow = (
            User.query.filter_by(id=bicycle.user_id)
            .with_entities(User.subscription_info)
            .first()
        )
        subscription_info = userRow.subscription_info

        if subscription_info:
            try:
                if bicycle.is_stolen:
                    data = "Bicycle is stolen"
                else:
                    data = "Bicycle is not stolen"

                # Define your VAPID keys and claims
                vapid_private_key = os.getenv("vapid_private_key")
                vapid_claims = {"sub": "mailto:clementfoooo@gmail.com"}

                # Use the webpush function instead of the WebPusher object
                resp = webpush(
                    subscription_info,
                    data,
                    vapid_private_key=vapid_private_key,
                    vapid_claims=vapid_claims,
                )

            except WebPushException as e:
                print("Web push failed: {}", repr(e))

    return jsonify({"message": "Bicycle updated successfully"}), 200


# Define a route to delete a bicycle by ID
@bp.route("/<string:bicycle_id>/location", methods=["GET"])
def get_bicycle_location(bicycle_id):
    bicycle = Bicycle.query.get(bicycle_id)
    if not bicycle:
        return jsonify({"message": "Bicycle not found"}), 404

    return (
        jsonify(
            {
                "lat": bicycle.last_seen_lat,
                "long": bicycle.last_seen_lon,
                "location": decode_coord(bicycle.last_seen_lat, bicycle.last_seen_lon),
            }
        ),
        200,
    )
