from app import db
from models import User, Lesson, Quiz, Challenge, Badge
import json

def seed():
    db.create_all()
    if not User.query.filter_by(username='student1').first():
        db.session.add(User(username='student1', password='pass123', role='student', classroom='P6A'))
        db.session.add(User(username='student2', password='pass123', role='student', classroom='P6B'))
        db.session.add(User(username='student3', password='pass123', role='student', classroom='P6A'))
        db.session.add(User(username='teacher1', password='teach123', role='teacher'))
        db.session.add(User(username='teacher2', password='teach123', role='teacher'))
        db.session.add(User(username='admin', password='admin123', role='admin'))

    if not Lesson.query.first():
        db.session.add(Lesson(title='Introduction to Fractions', description='Learn the basics of fractions and how to simplify them.'))
        db.session.add(Lesson(title='Human Body Systems', description='Understand major systems like digestive, nervous, etc.'))
        db.session.add(Lesson(title='African Geography', description='Explore regions, countries, lakes, and rivers of Africa.'))

    if not Quiz.query.first():
        q = Quiz(title='Computer parts Quiz', lesson_id=1, questions=json.dumps(['What is 1/2 + 3/4?','Simplify 8/16']))
        db.session.add(q)

    if not Challenge.query.first():
        db.session.add(Challenge(title='7-Day Learning Streak', description='Log in and complete 1 activity daily'))

    if not Badge.query.first():
        db.session.add(Badge(badge_id='badge_quiz_master', name='Quiz Master', requirement='Get average quiz score ≥90'))

    db.session.commit()
    print('Seeded DB')

if __name__ == '__main__':
    seed()
