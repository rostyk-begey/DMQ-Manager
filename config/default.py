from instance.config import *


class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_ALGORITHM = 'RS256'
    JWT_PRIVATE_KEY = RSA_PRIVATE_KEY
    JWT_PUBLIC_KEY = RSA_PUBLIC_KEY
    JWT_HEADER_TYPE = ''
    JWT_USER_CLAIMS = 'permissions'
