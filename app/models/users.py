from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    permissions = db.relationship('Permissions', backref='users', lazy='dynamic')

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

    def save_to_bd(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def hash_password(password):
        return bcrypt.generate_password_hash(password).decode('utf-8')

    def __init__(self, username=None, password=None, connect_nodes=False, disconnect_nodes=False,
                 create_queues=False, delete_queues=False, send_message=False, get_message=False, admin=False):
        self.username = username
        self.password = self.hash_password(str(password))
        permission = Permissions(create_queues=create_queues, delete_queues=delete_queues,
                                 connect_nodes=connect_nodes, disconnect_nodes=disconnect_nodes,
                                 send_message=send_message, get_message=get_message, admin=admin)
        self.permissions.append(permission)


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

