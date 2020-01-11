import click
from flask import Flask, request, abort, jsonify
from instance.config import *
from app.helpers.JWTHelper import jwt
from .models.users import *
from .routes.authorization import auth
from .routes.get_users import get_users
from .routes.nodes import nodes
from .routes.queues import queues
from .routes.statistics import stats

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_ALGORITHM'] = 'RS256'
app.config['JWT_PRIVATE_KEY'] = RSA_PRIVATE_KEY
app.config['JWT_PUBLIC_KEY'] = RSA_PUBLIC_KEY
app.config['JWT_HEADER_TYPE'] = ''
app.config['JWT_USER_CLAIMS'] = 'permissions'

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)

app.register_blueprint(auth)
app.register_blueprint(get_users)
app.register_blueprint(nodes)
app.register_blueprint(stats)
app.register_blueprint(queues)


@app.cli.command('create_db')
def create_db():
    try:
        db.create_all()
    except Exception as e:
        print(e)


@app.cli.command('add_admin')
@click.argument('username')
@click.argument('password')
def create_admin(username, password):
    try:
        user = User(username, password, connect_nodes=True, disconnect_nodes=True,
                    create_queues=True, delete_queues=True, send_message=True,
                    get_message=True, admin=True)
        user.save_to_bd()
    except Exception as e:
        print(e)
