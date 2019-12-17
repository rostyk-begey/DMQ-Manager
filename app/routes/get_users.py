from .. import *
from ..models.users import User
from flask import Blueprint

get_users = Blueprint('get_users', __name__)


@get_users.route('/users', methods=['GET'])
def return_users():
    if not request.headers['access_token']:
        abort(404)

    try:
        token_permissions = User().verify_token(request.headers['access_token'])
        if token_permissions['admin']:
            users = User.query.with_entities(User.id).all()
            id_list = [i[0] for i in users]
            users = []
            for i in id_list:
                user_dict = {}
                user_dict['user_id'] = i
                user = User.query.filter_by(id=i).first()
                user_dict['username'] = user.username
                user_dict['permissions'] = user.get_permissions()
                users.append(user_dict)
            return jsonify(users), 201
        else:
            return 'You have no permissions', 403
    except Exception as e:
        abort(404)
