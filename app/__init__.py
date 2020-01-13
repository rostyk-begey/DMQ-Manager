from flask import Flask, request, abort, jsonify
from instance.config import *
from app.helpers.JWTHelper import jwt
from .models.users import *
from .routes.authorization import auth
from .routes.get_users import get_users
from .routes.nodes import nodes
from .routes.queues import queues
from .routes.statistics import stats
from .cli.cli_commands import cli_commands

app = Flask(__name__)

app.config.from_object('config.development.DevelopmentConfig')

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)

app.register_blueprint(auth)
app.register_blueprint(get_users)
app.register_blueprint(nodes)
app.register_blueprint(stats)
app.register_blueprint(queues)
app.register_blueprint(cli_commands)
