from .. import *
from ..models.users import User, db
from flask import Blueprint

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=["POST"])
def login():
    if not request.json:
        abort(404)

    try:
        username = request.json.get('username')
        password = request.json.get('password')
        user = User.query.filter_by(username=username).first()
        if user.verify_password(password):
            access, refresh = user.generate_tokens()
            data = {
                'access_token': access,
                'refresh_token': refresh
            }
            return jsonify(data), 201
    except Exception as e:
        return 'Bad credentials', 403


@auth.route('/refresh', methods=['POST'])
def validate():
    if not request.headers['refresh_token']:
        abort(404)
    try:
        token = request.headers['refresh_token']
        access, refresh = User().refresh_token(token)
        data = {
            'access_token': access,
            'refresh_token': refresh
        }
        return jsonify(data), 200
    except Exception as e:
        print(e)


@auth.route('/register', methods=['POST'])
def register():
    if not request.json:
        abort(404)

    try:
        token_permissions = User().verify_token(request.headers['access_token'])
        if token_permissions['admin']:
            permissions = request.json['permissions']
            user = User(request.json['username'], request.json['password'], permissions['connect_nodes'],
                        permissions['disconnect_nodes'], permissions['create_queues'], permissions['delete_queues'],
                        permissions['send_message'], permissions['get_message'], permissions['admin'])
            db.session.add(user)
            db.session.commit()
            return 'User added', 200
        else:
            return 'You have no permission', 403
    except Exception as e:
        abort(404)
