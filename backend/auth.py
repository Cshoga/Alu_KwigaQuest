from werkzeug.security import generate_password_hash, check_password_hash
from models import User, db


class AuthService:
    @staticmethod
    def create_user(username, password, role='student', classroom=None):
        if User.query.filter_by(username=username).first():
            return None
        u = User(
            username=username,
            password_hash=generate_password_hash(password),
            role=role,
            classroom=classroom
        )
        db.session.add(u)
        db.session.commit()
        return u

    @staticmethod
    def verify_user(username, password):
        u = User.query.filter_by(username=username).first()
        if not u:
            return None
        if check_password_hash(u.password_hash, password):
            return u
        return None
