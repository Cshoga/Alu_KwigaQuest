from flask import Blueprint, jsonify, request
from models import Lesson
from app import db

lessons_bp = Blueprint('lessons_bp', __name__)

@lessons_bp.route('/', methods=['GET'])
def list_lessons():
    lessons = Lesson.query.all()
    out = [{'id':l.id,'title':l.title,'description':l.description,'assigned_class':l.assigned_class} for l in lessons]
    return jsonify(out)

@lessons_bp.route('/', methods=['POST'])
def create_lesson():
    data = request.get_json() or {}
    l = Lesson(title=data.get('title'), description=data.get('description'), assigned_class=data.get('assigned_class'))
    db.session.add(l)
    db.session.commit()
    return jsonify({'id':l.id}), 201
