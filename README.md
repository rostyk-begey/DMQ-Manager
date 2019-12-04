# Management node

## Key features
   * Grab and Return statistic from all Data Nodes
   * Display WEB page with statistics
   * Create queues on all Data Nodes
   * Delete queues on all Data Nodes


## API documentation
* ###  Manager SPA
	***
	#### Endpoint:
	` http://{manager-url}:{manager-port}/ `
	#### Protocol:
	` GET `
	#### Body:
	```json
	```

	#### Request example:
	```sh
	curl -v -X GET https://127.0.0.1:5000/
	```

	#### Response example:
	> Return html web page

* ###  Return statistics
	***
	#### Endpoint:
	` http://{manager-url}:{manager-port}/statistics/ `
	#### Protocol:
	` GET `
	#### Body:
	```json
	```

	#### Request example:
	```sh
	curl -v -X GET https://127.0.0.1:5000/statistics/ \
	-H 'Content-Type: application/json' \
	-H 'Accept: application/json' \ 
	-d ''
	```

	#### Response example:

	HTTP/ 1.1 200 OK

	```json
	{
	    "data_nodes": [
	        {
		        "address": "127.0.0.1",
		        "port": "5000",
	            "queues": [
	                {
	                    "id": "0001",
	                    "name": "queue1",
	                    "size": 3
	                },
	                {
	                    "id": "0002",
	                    "name": "queue2",
	                    "size": 4
	                }
	            ]
	        },
	        {
		        "address": "127.0.0.1",
		        "port": "5001", 
	            "queues": [
	                {
	                    "id": "0001",
	                    "name": "queue1",
	                    "size": 5
	                },
	                {
	                    "id": "0002",
	                    "name": "queue2",
	                    "size": 6
	                }
	            ]
	        }
	    ]
	}
	```
* ### Create queue
	***
	#### Endpoint:
	` http://{manager-url}:{manager-port}/queues/ `
	#### Protocol:
    ` POST `
	#### Body:
	```json
	{
	    "name": "{queue-name}"
	}
	```

	#### Request example:
	```sh
	curl -v -X POST https://127.0.0.1:5000/queues \
	-H 'Content-Type: application/json' \
	-H 'Accept: application/json' \ 
	-d '{
	        "name": "queue1"
	    }'
	```

	#### Response example:

	HTTP/ 1.1 201 Created

	```json
	{
	    "id": "1234",
	    "name": "queue1"
	}
	```
* ### Delete queue
	***
	#### Endpoint:
	` http://{manager-url}:{manager-port}/queues/{queue-id}/ `
	#### Protocol:
    ` DELETE `
	#### Body:
	```json
	```

	#### Request example:
	```sh
	curl -v -X DELETE https://127.0.0.1:5000/queues/1234/
	```

	#### Response example:

	HTTP/ 1.1 200 OK
