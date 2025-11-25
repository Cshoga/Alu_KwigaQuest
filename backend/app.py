from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)

from models import User, Lesson, Quiz, Challenge, Badge
from routes.auth import auth_bp
from routes.lessons import lessons_bp
from routes.quizzes import quizzes_bp
from routes.challenges import challenges_bp
from routes.badges import badges_bp

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(lessons_bp, url_prefix='/api/lessons')
app.register_blueprint(quizzes_bp, url_prefix='/api/quizzes')
app.register_blueprint(challenges_bp, url_prefix='/api/challenges')
app.register_blueprint(badges_bp, url_prefix='/api/badges')

@app.route('/api/health')
def health():
    return jsonify({'status':'ok'})

if __name__ == '__main__':
    db.create_all()
    app.run(port=5000, debug=True)
