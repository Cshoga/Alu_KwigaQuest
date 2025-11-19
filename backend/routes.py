from flask import Blueprint, request, jsonify
db.session.add(l)
db.session.commit()
return jsonify({'id':l.id})


@api.route('/quizzes', methods=['GET','POST'])
def quizzes():
if request.method == 'GET':
qs = Quiz.query.all()
out = [{'id':q.id,'title':q.title,'questions':q.questions} for q in qs]
return jsonify(out)
data = request.json
q = Quiz(title=data.get('title'), questions=data.get('questions'), author_id=data.get('author_id'))
db.session.add(q)
db.session.commit()
return jsonify({'id':q.id})


@api.route('/challenges', methods=['GET','POST'])
def challenges():
if request.method == 'GET':
cs = Challenge.query.all()
out = [{'id':c.id,'title':c.title,'description':c.description} for c in cs]
return jsonify(out)
data = request.json
c = Challenge(title=data.get('title'), description=data.get('description'), author_id=data.get('author_id'))
db.session.add(c)
db.session.commit()
return jsonify({'id':c.id})


@api.route('/progress/<int:user_id>', methods=['GET','POST'])
def progress(user_id):
if request.method == 'GET':
p = Progress.query.filter_by(user_id=user_id).first()
if not p:
return jsonify({'lesson_ids':'','quiz_scores':'','badges':''})
return jsonify({'lesson_ids':p.lesson_ids,'quiz_scores':p.quiz_scores,'badges':p.badges})
data = request.json
p = Progress.query.filter_by(user_id=user_id).first()
if not p:
p = Progress(user_id=user_id, lesson_ids=data.get('lesson_ids',''), quiz_scores=data.get('quiz_scores',''), badges=data.get('badges',''))
db.session.add(p)
else:
p.lesson_ids = data.get('lesson_ids',p.lesson_ids)
p.quiz_scores = data.get('quiz_scores',p.quiz_scores)
p.badges = data.get('badges',p.badges)
db.session.commit()
return jsonify({'status':'ok'})


@api.route('/admin/add_class', methods=['POST'])
def add_class():
data = request.json
t = AuthService.create_user(data.get('teacher_username'), data.get('teacher_password'), role='teacher', classroom=data.get('classroom'))
if not t:
return jsonify({'error':'exists'}), 400
return jsonify({'teacher_id':t.id})


@api.route('/teacher/add_student', methods=['POST'])
def add_student():
data = request.json
s = AuthService.create_user(data.get('username'), data.get('password'), role='student', classroom=data.get('classroom'))
if not s:
return jsonify({'error':'exists'}), 400
return jsonify({'student_id':s.id})


@api.route('/teacher/remove_student', methods=['POST'])
def remove_student():
data = request.json
u = User.query.filter_by(username=data.get('username')).first()
if not u:
return jsonify({'error':'nope'}), 404
db.session.delete(u)
db.session.commit()
return jsonify({'status':'removed'})
