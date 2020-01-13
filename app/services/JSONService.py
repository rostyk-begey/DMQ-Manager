import json


class JSONService:
    def __init__(self, _file):
        self._file = _file

    def write(self, data):
        if self._file:
            with open(self._file, 'w+') as f:
                json.dump(data, f, indent=4)

    def read(self):
        data = {}
        if self._file:
            with open(self._file, 'r') as f:
                data = json.load(f)
        return data
