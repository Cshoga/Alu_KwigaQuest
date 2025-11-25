from app import create_app
from extensions import db
from models import User, Lesson, Quiz, Challenge, Badge
import json

app = create_app()

def seed():
    with app.app_context():
        db.create_all()

        # Users
        if not User.query.filter_by(username='student1').first():
            db.session.add(User(username='student1', password='pass123', role='student', classroom='P6A'))
            db.session.add(User(username='student2', password='pass123', role='student', classroom='P6B'))
            db.session.add(User(username='student3', password='pass123', role='student', classroom='P6A'))
            db.session.add(User(username='teacher1', password='teach123', role='teacher'))
            db.session.add(User(username='teacher2', password='teach123', role='teacher'))
            db.session.add(User(username='admin', password='admin123', role='admin'))

        # Lessons
        if not Lesson.query.first():
            db.session.add(Lesson(title="Introduction to Fractions", description="Basics of fractions"))
            db.session.add(Lesson(title="Human Body Systems", description="Major body systems"))
            db.session.add(Lesson(title="African Geography", description="African regions and rivers"))

        # Quizzes
        if not Quiz.query.first():
            db.session.add(Quiz(
                title="Computer parts Quiz",
                lesson_id=1,
                questions=json.dumps(["What is 1/2 + 3/4?", "Simplify 8/16"])
            ))

        # Challenges
        if not Challenge.query.first():
            db.session.add(Challenge(title="7-Day Learning Streak", description="Complete 1 activity daily"))

        # Badges
        if not Badge.query.first():
            db.session.add(Badge(badge_id="badge_quiz_master", name="Quiz Master", requirement="Avg score ≥90"))

        db.session.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed()
