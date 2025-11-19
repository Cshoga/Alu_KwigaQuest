from flask import Flask
from flask_cors import CORS
from models import db
from routes import api
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL','sqlite:///db.sqlite3')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY','change-me')
CORS(app)
db.init_app(app)
jwt = JWTManager(app)
app.register_blueprint(api, url_prefix='/api')

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5000)

