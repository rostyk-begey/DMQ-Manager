import config
import instance
from app import *

app.config.from_object('config.default.Config')

if __name__ == '__main__':
    app.run()
