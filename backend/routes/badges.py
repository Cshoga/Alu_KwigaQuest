from flask import Blueprint, jsonify
from models import Badge

badges_bp = Blueprint('badges_bp', __name__)

@badges_bp.route('/', methods=['GET'])
def list_badges():
    badges = Badge.query.all()
    out = [{'id':b.badge_id,'name':b.name,'requirement':b.requirement} for b in badges]
    return jsonify(out)
