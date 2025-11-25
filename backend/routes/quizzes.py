from flask import Blueprint, jsonify, request
from models import Quiz
from app import db
import json

quizzes_bp = Blueprint('quizzes_bp', __name__)

@quizzes_bp.route('/', methods=['GET'])
def list_quizzes():
    quizzes = Quiz.query.all()
    out = [{'id':q.id,'title':q.title,'lesson_id':q.lesson_id,'questions': json.loads(q.questions or '[]')} for q in quizzes]
    return jsonify(out)

@quizzes_bp.route('/', methods=['POST'])
def create_quiz():
    data = request.get_json() or {}
    q = Quiz(title=data.get('title'), lesson_id=data.get('lesson_id'), questions=json.dumps(data.get('questions',[])))
    db.session.add(q)
    db.session.commit()
    return jsonify({'id':q.id}),201
