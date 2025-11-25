from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # student | teacher | admin
    classroom = db.Column(db.String(20), nullable=True)

class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    difficulty = db.Column(db.String(50))
    assigned_class = db.Column(db.String(20))

class Quiz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    lesson_id = db.Column(db.Integer)
    questions = db.Column(db.Text)  # JSON string

class Challenge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)

class Badge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    badge_id = db.Column(db.String(80), unique=True)
    name = db.Column(db.String(200))
    requirement = db.Column(db.String(400))
