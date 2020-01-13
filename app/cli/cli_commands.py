import click
from flask import Blueprint
from app import *

cli_commands = Blueprint('cli_commands', __name__)


@cli_commands.cli.command('create_db')
def create_db():
    try:
        db.create_all()
    except Exception as e:
        print(e)


@cli_commands.cli.command('add_admin')
@click.argument('username')
@click.argument('password')
def create_admin(username, password):
    try:
        user = User(username, password, connect_nodes=True, disconnect_nodes=True,
                    create_queues=True, delete_queues=True, send_message=True,
                    get_message=True, admin=True)
        user.save_to_bd()
    except Exception as e:
        print(e)