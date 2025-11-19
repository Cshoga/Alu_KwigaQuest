from flask import Blueprint, request, jsonify
from models import db, User, Lesson, Quiz, Challenge, Progress
from auth import AuthService
from badges import BadgeService
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register():
    data = request.json
    u = AuthService.create_user(data.get('username'), data.get('password'), data.get('role','student'), data.get('classroom'))
    if not u:
        return jsonify({'error':'exists'}), 400
    token = create_access_token(identity={'id':u.id,'role':u.role})
    return jsonify({'token':token,'user':{'id':u.id,'username':u.username,'role':u.role}})

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    u = AuthService.verify_user(data.get('username'), data.get('password'))
    if not u:
        return jsonify({'error':'invalid'}), 401
    token = create_access_token(identity={'id':u.id,'role':u.role})
    return jsonify({'token':token,'user':{'id':u.id,'username':u.username,'role':u.role,'classroom':u.classroom}})

@api.route('/lessons', methods=['GET','POST'])
@jwt_required(optional=True)
def lessons():
    if request.method == 'GET':
        ls = Lesson.query.all()
        out = [{'id':l.id,'title':l.title,'content':l.content} for l in ls]
        return jsonify(out)
    data = request.json
    current = get_jwt_identity()
    l = Lesson(title=data.get('title'), content=data.get('content'), author_id=current['id'] if current else None)
    db.session.add(l)
    db.session.commit()
    return jsonify({'id':l.id})

@api.route('/quizzes', methods=['GET','POST'])
@jwt_required(optional=True)
def quizzes():
    if request.method == 'GET':
        qs = Quiz.query.all()
        out = [{'id':q.id,'title':q.title,'questions':q.questions} for q in qs]
        return jsonify(out)
    data = request.json
    current = get_jwt_identity()
    q = Quiz(title=data.get('title'), questions=data.get('questions'), author_id=current['id'] if current else None)
    db.session.add(q)
    db.session.commit()
    return jsonify({'id':q.id})

@api.route('/quizzes/<int:quiz_id>/submit', methods=['POST'])
@jwt_required()
def submit_quiz(quiz_id):
    data = request.json
    answers = data.get('answers',{})
    q = Quiz.query.get(quiz_id)
    if not q:
        return jsonify({'error':'noquiz'}),404
    import json
    qs = json.loads(q.questions)
    total = len(qs)
    correct = 0
    for i,item in enumerate(qs):
        key = str(i)
        if key in answers and answers[key]==item.get('correct'):
            correct +=1
    score = int((correct/total)*100) if total else 0
    uid = get_jwt_identity()['id']
    p = Progress.query.filter_by(user_id=uid).first()
    if not p:
        p = Progress(user_id=uid, lessons_completed='', quiz_scores=f'{quiz_id}:{score}', badges='')
        db.session.add(p)
    else:
        qslist = [x for x in p.quiz_scores.split(',') if x]
        qslist.append(f'{quiz_id}:{score}')
        p.quiz_scores = ','.join(qslist)
    db.session.commit()
    BadgeService.evaluate_and_award(uid)
    return jsonify({'score':score})

@api.route('/progress', methods=['GET'])
@jwt_required()
def get_progress():
    uid = get_jwt_identity()['id']
    p = Progress.query.filter_by(user_id=uid).first()
    if not p:
        return jsonify({'lessons_completed':[],'quiz_scores':[],'badges':[]})
    return jsonify({'lessons_completed':[x for x in p.lessons_completed.split(',') if x],'quiz_scores':[x for x in p.quiz_scores.split(',') if x],'badges':[x for x in p.badges.split(',') if x]})

@api.route('/progress/mark_lesson', methods=['POST'])
@jwt_required()
def mark_lesson():
    data = request.json
    lesson_id = data.get('lesson_id')
    uid = get_jwt_identity()['id']
    p = Progress.query.filter_by(user_id=uid).first()
    if not p:
        p = Progress(user_id=uid, lessons_completed=str(lesson_id), quiz_scores='', badges='')
        db.session.add(p)
    else:
        arr = [x for x in p.lessons_completed.split(',') if x]
        if str(lesson_id) not in arr:
            arr.append(str(lesson_id))
        p.lessons_completed = ','.join(arr)
    db.session.commit()
    BadgeService.evaluate_and_award(uid)
    return jsonify({'status':'ok'})

@api.route('/teacher/add_student', methods=['POST'])
@jwt_required()
def add_student():
    data = request.json
    current = get_jwt_identity()
    if current['role']!='teacher':
        return jsonify({'error':'noperm'}),403
    s = AuthService.create_user(data.get('username'), data.get('password'), role='student', classroom=data.get('classroom'))
    if not s:
        return jsonify({'error':'exists'}), 400
    return jsonify({'student_id':s.id})

@api.route('/teacher/remove_student', methods=['POST'])
@jwt_required()
def remove_student():
    data = request.json
    current = get_jwt_identity()
    if current['role']!='teacher':
        return jsonify({'error':'noperm'}),403
    u = User.query.filter_by(username=data.get('username')).first()
    if not u:
        return jsonify({'error':'nope'}), 404
    db.session.delete(u)
    db.session.commit()
    return jsonify({'status':'removed'})

@api.route('/admin/add_class', methods=['POST'])
@jwt_required()
def add_class():
    current = get_jwt_identity()
    if current['role']!='admin':
        return jsonify({'error':'noperm'}),403
    data = request.json
    t = AuthService.create_user(data.get('teacher_username'), data.get('teacher_password'), role='teacher', classroom=data.get('classroom'))
    if not t:
        return jsonify({'error':'exists'}),400
    return jsonify({'teacher_id':t.id})
