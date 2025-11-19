from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class User(db.Model):
id = db.Column(db.Integer, primary_key=True)
username = db.Column(db.String(120), unique=True, nullable=False)
password_hash = db.Column(db.String(256), nullable=False)
role = db.Column(db.String(20), nullable=False)
classroom = db.Column(db.String(120))


class Lesson(db.Model):
id = db.Column(db.Integer, primary_key=True)
title = db.Column(db.String(200), nullable=False)
content = db.Column(db.Text, nullable=False)
created_at = db.Column(db.DateTime, default=datetime.utcnow)
author_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class Quiz(db.Model):
id = db.Column(db.Integer, primary_key=True)
title = db.Column(db.String(200), nullable=False)
questions = db.Column(db.Text, nullable=False)
author_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class Challenge(db.Model):
id = db.Column(db.Integer, primary_key=True)
title = db.Column(db.String(200), nullable=False)
description = db.Column(db.Text, nullable=False)
author_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class Progress(db.Model):
id = db.Column(db.Integer, primary_key=True)
user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
lesson_ids = db.Column(db.Text, default='')
quiz_scores = db.Column(db.Text, default='')
badges = db.Column(db.Text, default='')
