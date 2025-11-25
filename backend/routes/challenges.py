from flask import Blueprint, jsonify, request
from models import Challenge
from app import db

challenges_bp = Blueprint('challenges_bp', __name__)

@challenges_bp.route('/', methods=['GET'])
def list_challenges():
    cs = Challenge.query.all()
    out = [{'id':c.id,'title':c.title,'description':c.description} for c in cs]
    return jsonify(out)

@challenges_bp.route('/', methods=['POST'])
def create_challenge():
    data = request.get_json() or {}
    c = Challenge(title=data.get('title'), description=data.get('description'))
    db.session.add(c)
    db.session.commit()
    return jsonify({'id':c.id}),201
