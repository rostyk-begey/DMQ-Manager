from app.models.users import User
from functools import wraps
from flask import jsonify
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, verify_jwt_in_request, get_jwt_claims,
    get_raw_jwt
)

jwt = JWTManager()


@jwt.user_claims_loader
def add_permissions_to_token(username):
    user = User.query.filter_by(username=username).first()
    return user.get_permissions()


def permission_required(permission_name):
    def required(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            permissions = get_jwt_claims()
            if not permissions[permission_name]:
                return jsonify(msg='Access denied!'), 403
            else:
                return fn(*args, **kwargs)
        return wrapper
    return required


def create_manager_token():
    token = create_access_token(identity='manager', user_claims={'manager': True})
    return token
