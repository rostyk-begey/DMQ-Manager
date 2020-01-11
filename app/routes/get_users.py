from flask import Blueprint
from app.helpers.JWTHelper import *

get_users = Blueprint('get_users', __name__, url_prefix='/api')


@get_users.route('/users', methods=['GET'])
@permission_required('admin')
def return_users():
    try:
        users = User.query.with_entities(User.id).all()
        id_list = [i[0] for i in users]
        users = []
        for i in id_list:
            user_dict = {'user_id': i}
            user = User.query.filter_by(id=i).first()
            user_dict['username'] = user.username
            user_dict['permissions'] = user.get_permissions()
            users.append(user_dict)
        return jsonify(users), 201
    except Exception as e:
        print(e)
        return 'Something went wrong', 404
