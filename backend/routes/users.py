from flask import Blueprint, request, jsonify
from models import User
from db import db
import hashlib

bp = Blueprint('users', __name__, url_prefix='/users')


# Define a route to sign up a new user
@bp.route('/signup', methods=['POST'])
def signup():
    data = request.json  # Assuming you're sending JSON data in the request
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    # Check if a user with the same email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'Email address already in use'}), 400

    # Create a new user
    hashed_password = generate_password_hash(password)
    new_user = User(name=name, email=email, hashed_password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


def generate_password_hash(password):
    # Encode the password as bytes
    password_bytes = password.encode('utf-8')
    # Use SHA-256 hash function to create a hash object
    hash_object = hashlib.sha256(password_bytes)
    # Get the hexadecimal representation of the hash
    password_hash = hash_object.hexdigest()
    return password_hash    


# Define a route to log in a user
@bp.route('/login', methods=['POST'])
def login():
    data = request.json  # Assuming you're sending JSON data in the request
    email = data.get('email')
    password = data.get('password')

    # Find the user by email
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Check if the provided password is correct
    if check_password_hash(user.hashed_password, password):
        # You can create and return an authentication token here if needed
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid password'}), 401


def check_password_hash(hashed_password, password):
    return hashed_password == generate_password_hash(password)
