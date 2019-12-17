from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import jwt
import datetime
from instance.config import *

db = SQLAlchemy()
bcrypt = Bcrypt()


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    token = db.relationship('Token', backref='users', lazy='dynamic')
    permissions = db.relationship('Permissions', backref='users', lazy='dynamic')

    def update_tokens(self, access_token, refresh_token):
        self.token[0].access_token = access_token
        self.token[0].refresh_token = refresh_token
        db.session.commit()

    def verify_password(self, password):
        return bcrypt.check_password_hash(self.password, password.encode('utf-8'))

    def get_permissions(self):
        permissions = {
                'create_queues': self.permissions[0].create_queues,
                'delete_queues': self.permissions[0].delete_queues,
                'connect_nodes': self.permissions[0].connect_nodes,
                'disconnect_nodes': self.permissions[0].disconnect_nodes,
                'send_message': self.permissions[0].send_message,
                'get_message': self.permissions[0].get_message,
                'admin': self.permissions[0].admin
            }
        return permissions

    def refresh_token(self, token):
        try:
            payload = jwt.decode(token, key=RSA_PUBLIC_KEY, algorithms='RS256')
            user_id = payload.get('id')
            user = User.query.filter_by(id=user_id).first()
            if token == user.token[0].refresh_token:
                return user.generate_tokens()
            return 'Something went wrong', 404
        except jwt.ExpiredSignatureError:
            return 'Your token has expired'
        except jwt.InvalidTokenError:
            return 'Invalid token'

    def generate_tokens(self):
        access_payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=15),
            'iat': datetime.datetime.utcnow(),
            'id': self.id,
            'permissions': self.get_permissions()
        }
        access_token = jwt.encode(payload=access_payload, key=RSA_PRIVATE_KEY, algorithm='RS256').decode('UTF-8')
        refresh_payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30),
            'iat': datetime.datetime.utcnow(),
            'id': self.id
        }
        refresh_token = jwt.encode(payload=refresh_payload, key=RSA_PRIVATE_KEY, algorithm='RS256').decode('UTF-8')
        self.update_tokens(access_token, refresh_token)
        return access_token, refresh_token

    @staticmethod
    def hash_password(password):
        return bcrypt.generate_password_hash(password).decode('utf-8')

    def verify_token(self, token):
        try:
            payload = dict(jwt.decode(token, key=RSA_PUBLIC_KEY, algorithms='RS256'))
            return payload['permissions']
        except jwt.ExpiredSignatureError:
            return 'Your token has expired'
        except jwt.InvalidTokenError:
            return 'Invalid token'

    def __init__(self, username=None, password=None, connect_nodes=False, disconnect_nodes=False,
                 create_queues=False, delete_queues=False, send_message=False, get_messsage=False, admin=False):
        self.username = username
        self.password = self.hash_password(str(password))
        self.token.append(Token())
        permission = Permissions(create_queues=create_queues, delete_queues=delete_queues,
                                 connect_nodes=connect_nodes, disconnect_nodes=disconnect_nodes,
                                 send_message=send_message, get_message=get_messsage, admin=admin)
        self.permissions.append(permission)


class Token(db.Model):
    __tablename__ = 'tokens'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    access_token = db.Column(db.String)
    refresh_token = db.Column(db.String)


class Permissions(db.Model):
    __tablename__ = 'permissions'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    connect_nodes = db.Column(db.Boolean, default=False)
    disconnect_nodes = db.Column(db.Boolean, default=False)
    create_queues = db.Column(db.Boolean, default=False)
    delete_queues = db.Column(db.Boolean, default=False)
    send_message = db.Column(db.Boolean, default=False)
    get_message = db.Column(db.Boolean, default=False)
    admin = db.Column(db.Boolean, default=False)

