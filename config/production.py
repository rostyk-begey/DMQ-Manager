from .default import *


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = DATABASE_URI
