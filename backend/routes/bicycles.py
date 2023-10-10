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
            kwargs = {'user_id': userId}
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
    bicycle.is_stolen = data.get("is_stolen", bicycle.is_stolen)

    db.session.commit()

    return jsonify({"message": "Bicycle updated successfully"}), 200
