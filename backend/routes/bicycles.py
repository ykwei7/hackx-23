from flask import Blueprint, request, jsonify
from models import Bicycle, User
from db import db

bp = Blueprint("bicycles", __name__, url_prefix="/bicycles")


@bp.route("/", methods=["POST"])
def add_bicycle():
    data = request.json  # Assuming you're sending JSON data in the request
    user_id = data.get("user_id")
    name = data.get("name")
    brand = data.get("brand")
    model = data.get("model")
    description = data.get("description")
    last_seen_lat = data.get("last_seen_lat", None)
    last_seen_lon = data.get("last_seen_lon", None)

    # Check if the user exists
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Create a new bicycle
    new_bicycle = Bicycle(
        user_id=user_id,
        name=name,
        brand=brand,
        model=model,
        description=description,
        last_seen_lat=last_seen_lat,
        last_seen_lon=last_seen_lon,
    )

    db.session.add(new_bicycle)
    db.session.commit()

    return jsonify({"message": "Bicycle added successfully"}), 201


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

    db.session.commit()

    return jsonify({"message": "Bicycle updated successfully"}), 200
