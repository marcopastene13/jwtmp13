"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Email and password required"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "User already exists"}), 400

    hashed_password = generate_password_hash(data["password"])

    new_user = User(
        email=data["email"],
        password=hashed_password,
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Email and password required"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if not user or not check_password_hash(user.password, data["password"]):
        return jsonify({"msg": "Invalid email or password"}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": access_token,
        "user_id": user.id
    }), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    user_id = get_jwt_identity() 
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "msg": f"Welcome to the private route, {user.email}!",
        "user": {
            "id": user.id,
            "email": user.email
        }
    }), 200