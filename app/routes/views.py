from flask import Blueprint, render_template, send_from_directory

views = Blueprint('views', __name__, static_folder="../static", template_folder="../static")


@views.route('/', methods=['GET'])
def index():
    return render_template('./dist/index.html')


@views.route('/<path:filename>')
def send_static(filename):
    return send_from_directory('./static/dist/', filename)
