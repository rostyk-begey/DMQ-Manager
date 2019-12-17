from flask import Flask, jsonify, request, abort
from instance.config import *
from .models.users import *
from .routes.authorization import auth
from .routes.get_users import get_users


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
bcrypt.init_app(app)

app.register_blueprint(auth)
app.register_blueprint(get_users)

with app.app_context():
    db.create_all()
