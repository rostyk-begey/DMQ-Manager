from flask import Blueprint
from app import *
from app.helpers.JWTHelper import *

auth = Blueprint('auth', __name__, url_prefix='/api')


@auth.route('/login', methods=["POST"])
def login():
    if not request.json['username'] or not request.json['password']:
        abort(404)

    try:
        username = request.json.get('username')
        password = request.json.get('password')
        user = User.query.filter_by(username=username).first_or_404()
        if user.verify_password(password):
            data = {
                'access_token': create_access_token(identity=username),
                'refresh_token': create_refresh_token(identity=username)
            }
            return jsonify(data), 200
        return 'Bad credentials', 403
    except Exception as e:
        print(e)
        return 'Something went wrong', 404


@auth.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    try:
        username = get_jwt_identity()
        data = {
            'access_token': create_access_token(identity=username),
            'refresh_token': create_refresh_token(identity=username)
        }
        return jsonify(data), 200
    except Exception as e:
        print(e)
        return 'Something went wrong', 404


@auth.route('/add_user', methods=['POST'])
@permission_required('admin')
def add_user():
    if not request.json:
        abort(404)

    try:
        permissions = request.json['permissions']
        user = User(request.json['username'], request.json['password'], permissions['connect_nodes'],
                    permissions['disconnect_nodes'], permissions['create_queues'], permissions['delete_queues'],
                    permissions['send_message'], permissions['get_message'], permissions['admin'])
        user.save_to_bd()
        return 'New user created', 201
    except Exception as e:
        print(e)
        return 'Something went wrong', 404
