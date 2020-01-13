from flask import Blueprint
import requests
from app import *
from app.services.JSONService import JSONService
from app.helpers.JWTHelper import *

queues = Blueprint('queues', __name__, url_prefix='/api')

node_service = JSONService("app/data/data_nodes.json")
queues_service = JSONService("app/data/queues.json")


@queues.route('/queues', methods=['POST'])
@permission_required('create_queues')
def create_queues():
    if not request.json:
        abort(404)

    try:
        queues_json = queues_service.read()
        values = queues_json.values()
        if request.json['name'] in values:
            abort(404)
        ids = list(queues_json.keys())
        queue_id = 0 if not ids else int(ids[-1]) + 1
        queue = {str(queue_id): request.json['name']}
        queues_json.update(queue)
        nodes_json = node_service.read()
        keys = list(nodes_json.keys())
        if keys:
            data_to_send = {'id': queue_id,
                            'name': request.json['name']}
            header = {'Authorization': create_manager_token()}
            for i in keys:
                url = 'http://' + nodes_json[i]['ip'] + ':' + str(nodes_json[i]['port'])
                ping = requests.get(url=url + '/ping')
                if ping.text == 'pong':
                    requests.post(url + '/queues', json=data_to_send, headers=header)
        else:
            return jsonify(msg='Connect node first'), 404
        queues_service.write(queues_json)
        return 'Queue created', 201
    except Exception as e:
        print(e)
        return 'Something went wrong', 404


@queues.route('/queues/<queue_id>', methods=['DELETE'])
@permission_required('delete_queues')
def delete_queue(queue_id):
    try:
        queues_json = queues_service.read()
        name = queues_json[str(queue_id)]
        if not name:
            abort(404)
        nodes_json = node_service.read()
        keys = list(nodes_json.keys())
        if keys:
            header = {'Authorization': create_manager_token()}
            for i in keys:
                url = 'http://' + nodes_json[i]['ip'] + ':' + str(nodes_json[i]['port'])
                ping = requests.get(url=url + '/ping')
                if ping.text == 'pong':
                    requests.delete(url + '/queues/' + str(queue_id), headers=header)
        del queues_json[str(queue_id)]
        queues_service.write(queues_json)
        return 'OK', 200
    except Exception as e:
        print(e)
        return 'Something went wrong', 404
