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
            return jsonify(data), 200
    except Exception as e:
        return 'Bad credentials', 403


@auth.route('/refresh', methods=['POST'])
def validate():
    if not request.json['refresh_token']:
        abort(404)
    try:
        token = request.json['refresh_token']
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
        permissions = User().verify_token(request.json['access_token'])
        if permissions['admin']:
            payload = request.json['user']
            print(payload)
            user = User(payload['username'], payload['password'], payload['connect_nodes'], payload['disconnect_nodes'],
                        payload['create_queues'], payload['delete_queues'], payload['send_message'],
                        payload['get_message'], payload['admin'])
            db.session.add(user)
            db.session.commit()
            return 'User added', 200
        else:
            return 'You have no permission', 403
    except Exception as e:
        abort(404)
