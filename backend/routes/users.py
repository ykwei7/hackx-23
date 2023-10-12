from flask import Blueprint, request, jsonify
from models import User, Bicycle, Report
from routes.reports import decode_coord
from db import db
import hashlib

from sqlalchemy import null

bp = Blueprint("users", __name__, url_prefix="/users")


# Define a route to sign up a new user
@bp.route("/signup", methods=["POST"])
def signup():
    data = request.json  # Assuming you're sending JSON data in the request
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # TODO: add a deviceId field

    # Check if a user with the same email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "Email address already in use"}), 400

    # Create a new user
    hashed_password = generate_password_hash(password)
    new_user = User(name=name, email=email, hashed_password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


# Route to fetch a user by user_id
@bp.route("/<string:user_id>", methods=["GET"])
def get_user_by_id(user_id):
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"message": "User not found"}), 404

    # Define a function to serialize the user to JSON
    def user_to_dict(user):
        return {
            "user_id": user.id,
            "name": user.name,
            "email": user.email,
        }

    return jsonify(user_to_dict(user)), 200


# Route to update the subscription_info of a user
@bp.route("/<string:user_id>/subscribe", methods=["PUT"])
def subscribe(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    try:
        data = request.get_json()
    except Exception:
        data = null()
    user.subscription_info = data

    db.session.commit()

    return jsonify({"message": "User subscription info updated"}), 200


def generate_password_hash(password):
    # Encode the password as bytes
    password_bytes = password.encode("utf-8")
    # Use SHA-256 hash function to create a hash object
    hash_object = hashlib.sha256(password_bytes)
    # Get the hexadecimal representation of the hash
    password_hash = hash_object.hexdigest()
    return password_hash


# Define a route to log in a user
@bp.route("/login", methods=["POST"])
def login():
    data = request.json  # Assuming you're sending JSON data in the request
    email = data.get("email")
    password = data.get("password")

    # Find the user by email
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Check if the provided password is correct
    if check_password_hash(user.hashed_password, password):
        # You can create and return an authentication token here if needed
        return (
            jsonify({"message": "Login successful", "data": {"user_id": user.id}}),
            200,
        )
    else:
        return jsonify({"message": "Invalid password"}), 401


@bp.route("/<string:user_id>/bicycles", methods=["GET"])
def get_user_bicycles(user_id):
    try:
        # Query the database to retrieve the user by user_id
        user = User.query.get(user_id)

        # Check if the user exists
        if not user:
            return jsonify({"message": "User not found"}), 404

        # Retrieve all bicycles owned by the user
        bicycles = Bicycle.query.filter_by(user_id=user_id).all()

        # Create a list to store bicycle information
        bicycles_list = []

        # Iterate through the bicycles and add their details to the list
        for bicycle in bicycles:
            bicycle_info = {
                "id": bicycle.id,
                "name": bicycle.name,
                "brand": bicycle.brand,
                "model": bicycle.model,
                "description": bicycle.description,
                "last_seen_lat": bicycle.last_seen_lat,
                "last_seen_lon": bicycle.last_seen_lon,
            }
            bicycles_list.append(bicycle_info)

        return jsonify({"bicycles": bicycles_list}), 200

    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500


@bp.route("/<string:user_id>/reports", methods=["GET"])
def get_user_reports(user_id):
    try:
        # Query the database to retrieve the user by user_id
        user = User.query.get(user_id)

        # Check if the user exists
        if not user:
            return jsonify({"message": "User not found"}), 404

        # Retrieve all bicycles owned by the user
        reports = Report.query.filter_by(user_id=user_id).all()

        # Create a list to store bicycle information
        reports_list = []

        # Iterate through the bicycles and add their details to the list
        for report in reports:
            reports_info = {
                "id": report.id,
                "reported_time": report.reported_time,
                "description": report.description,
                "lat": report.lat,
                "long": report.long,
                "location": decode_coord(report.lat, report.long),
            }
            reports_list.append(reports_info)

        return jsonify({"reports": reports_list}), 200

    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500


def check_password_hash(hashed_password, password):
    return hashed_password == generate_password_hash(password)
