from flask import Blueprint, request, jsonify
from models import User
from app import db

auth_bp = Blueprint('auth_bp', __name__)
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error':'username and password required'}), 400
    user = User.query.filter_by(username=username, password=password).first()
    if not user:
        return jsonify({'error':'invalid credentials'}), 401
    return jsonify({'id':user.id,'username':user.username,'role':user.role,'classroom':user.classroom})
