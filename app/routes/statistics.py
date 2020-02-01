from flask import Blueprint
import requests
from app.services.JSONService import JSONService
from app import *

stats = Blueprint('stats', __name__)

node_service = JSONService("app/data/data_nodes.json")
stats_service = JSONService("app/data/queues.json")


@stats.route('/statistics', methods=['GET'])
def get_stats():
    try:
        data_nodes = []
        nodes_json = node_service.read()
        keys = list(nodes_json.keys())
        for i in keys:
            node_dict = {'address': nodes_json[i]['ip'], 'port': str(nodes_json[i]['port'])}
            url = 'http://' + nodes_json[i]['ip'] + ':' + str(nodes_json[i]['port']) + '/statistics'
            response = requests.get(url)
            node_dict['cpu_load_percent'] = response.json['cpu_load_percent']
            node_dict['queues'] = response.json['queues']
            data_nodes.append(node_dict)
        return jsonify(data_nodes), 200
    except Exception as e:
        print(e)
        abort(404)
