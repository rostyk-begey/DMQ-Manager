import requests
from flask import Blueprint
from app import *
from app.services.JSONService import JSONService
from app.helpers.JWTHelper import *
from app import RSA_PUBLIC_KEY


nodes = Blueprint('nodes', __name__, url_prefix='/api')

node_service = JSONService("app/data/data_nodes.json")
queues_service = JSONService("app/data/queues.json")


@nodes.route('/connect_node', methods=['POST'])
@permission_required('connect_nodes')
def add_node():
    if not request.json:
        abort(404)

    try:
        url = 'http://' + request.json['ip'] + ':' + str(request.json['port'])
        ping = requests.get(url=url + '/ping')
        if ping.text == 'pong':
            nodes_json = node_service.read()
            index = list(nodes_json.keys())
            node_id = 0 if not index else int(index[-1]) + 1
            node_info = {str(node_id): {
                'ip': request.json['ip'],
                'port': request.json['port']
            }}
            nodes_json.update(node_info)
            node_service.write(nodes_json)
            rsa_key = {'rsa_public_key': RSA_PUBLIC_KEY}
            requests.post(url=url + '/connect', json=rsa_key)
            queues_json = queues_service.read()
            keys = list(queues_json.keys())
            header = {'Authorization': create_manager_token()}
            if keys:
                for i in keys:
                    data_to_send = {'id': i,
                                    'name': queues_json[i]}
                    requests.post(url + '/queues', json=data_to_send, headers=header)
            response = {'id': str(node_id),
                        'ip': request.json['ip'],
                        'port': request.json['port']}
            return jsonify(response), 201
        else:
            return "Data node does not respond", 404
    except Exception as e:
        print(e)
        return 'Something went wrong', 404


@nodes.route('/disconnect_node/<node_id>', methods=['DELETE'])
@permission_required('disconnect_nodes')
def disconnect_node(node_id):
    try:
        nodes_json = node_service.read()
        node = nodes_json[str(node_id)]
        if node:
            url = 'http://' + node['ip'] + ":" + str(node['port']) + '/disconnect'
            header = {'Authorization': create_manager_token()}
            response = requests.delete(url, headers=header)
            if response.status_code == 200:
                del nodes_json[str(node_id)]
                node_service.write(nodes_json)
                response = {'id': node_id,
                            'ip': node['ip'],
                            'port': node['port']}
                return jsonify(response), 200
            else:
                return "Data node does not respond", 404
        else:
            return "There is no node with id {}".format(node_id), 404
    except Exception as e:
        print(e)
        return 'Something went wrong', 404
