from flask import Blueprint, request, jsonify
from models import Bicycle, User
from db import db

import os
import json

from pywebpush import webpush, WebPushException

bp = Blueprint("devices", __name__, url_prefix="/devices")


@bp.route("/<string:device_id>/update", methods=["PUT"])
def update_bicycle_stolen(device_id):
    bicycle = Bicycle.query.filter_by(device_id=device_id).first()
    if not bicycle:
        return jsonify({"message": "Bicycle not found"}), 404

    message_data = request.get_json()  # get the data from the request
    is_stolen = message_data.get("is_stolen")

    bicycle.last_seen_lat = message_data.get("lat")
    bicycle.last_seen_lon = message_data.get("long")

    send_notif = False
    # First time the bike is stolen
    if is_stolen != bicycle.is_stolen:
        bicycle.is_stolen = is_stolen
        send_notif = is_stolen

    db.session.commit()

    if send_notif:
        subscription_info = bicycle.user.subscription_info

        if subscription_info:
            try:
                message = f"Suspicious activity detected for {bicycle.name}"
                message_data = json.dumps(
                    {
                        "message": message,
                        "bicycle": {
                            "id": bicycle.id,
                            "name": bicycle.name,
                            "brand": bicycle.brand,
                            "is_stolen": bicycle.is_stolen,
                        },
                    }
                )

                # Define your VAPID keys and claims
                vapid_private_key = os.getenv("vapid_private_key")
                vapid_claims = {"sub": "mailto:clementfoooo@gmail.com"}

                # Use the webpush function instead of the WebPusher object
                resp = webpush(
                    subscription_info,
                    message_data,
                    vapid_private_key=vapid_private_key,
                    vapid_claims=vapid_claims,
                )
                print(resp)

            except WebPushException as e:
                print("Web push failed: {}", repr(e))

    return (
        jsonify(
            {
                "message": "Bicycle status updated successfully",
            }
        ),
        200,
    )
