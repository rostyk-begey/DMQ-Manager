# Management node

## Key features
   * Grab and Return statistic from all Data Nodes
   * Display WEB page with statistics
   * Connect Data Node
   * Disconnect Data Node
   * Create queues on all Data Nodes
   * Delete queues on all Data Nodes
   * Login
   * Refresh token
   * Add user


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
* ### Connect Data Node
    ***
    ### Endpoint:
    ` http://{manager-url}:{manager-port}/api/connect_node `
    ### Protocol:
    ` POST `
    ### Body
    ```json
    {
        "ip": "{manager-ip}",
        "port": "{manager-port}"
    }
    ```
  
    #### Request example:
	```sh
    curl -v -X POST http://localhost:5000/api/connect_node \
    -H 'Content-Type: application/json' \
    -H 'Authorization: {access token}' \
    -H 'Accept: application/json' \ 
    -d '{
            "ip": "localhost",
            "port": "5000"
        }'
	```
 
    #### Response example:

	HTTP/ 1.1 201 Created
	
	```json
    {
        "id": "1",
        "ip": "localhost",
        "port": "5000" 
    }
    ```
 
 * ### Disconnect Data Node
    ***
    ### Endpoint:
    ` http://{manager-url}:{manager-port}/api/disconnect_node/{node-id} `
    ### Protocol:
    ` DELETE `
    ### Body
    ```json
    ```
  
    #### Request example:
	```sh
    curl -v -X DELETE http://localhost:5000/api/disconnect_node/1
    -H 'Authorization: {access token}'
	```
 
    #### Response example:

	HTTP/ 1.1 200 OK
	
	```json
    {
        "id": "1",
        "ip": "localhost",
        "port": "5000" 
    }
    ```

* ### Create queue
	***
	#### Endpoint:
	` http://{manager-url}:{manager-port}/api/queues/ `
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
    curl -v -X POST http://localhost:5000/api/queues \
    -H 'Content-Type: application/json' \
    -H 'Authorization: {access token}' \
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
	` http://{manager-url}:{manager-port}/api/queues/{queue-id}/ `
	#### Protocol:
    ` DELETE `
	#### Body:
	```json
	```

	#### Request example:
	```sh
    curl -v -X DELETE http://localhost:5000/api/queues/1234/
    -H 'Authorization: {access token}'
	```

	#### Response example:

	HTTP/ 1.1 200 OK

* ### Login
	***
	#### Endpoint:
	` http://{manager-url}:{manager-port}/api/login `
	#### Protocol:
    ` POST `
	#### Body:
    ```json
    {
        "username": "{username}",
        "password": "{password"
    }
    ```
	#### Request example:
	```sh
    curl -v -X POST http://localhost:5000/api/login \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -d '{
            "username": "test",
            "password": "test"
         }'
	```

	#### Response example:

	HTTP/ 1.1 200 OK

	```json
	{
    	"access_token": "{access token}",
    	"refresh_token": "{refresh token}"
	}
	```

 * ### Refresh token
	***
	#### Endpoint:
	` http://{manager-url}:{manager-port}/api/refresh `
	#### Protocol:
    ` POST `
	#### Body:
	```json
	```

	#### Request example:
	```sh
    curl -v -X POST http://localhost:5000/api/refresh \
    -H 'Authorization: {refresh-token}' \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -d ''
	```

	#### Response example:

	HTTP/ 1.1 200 OK

	```json
	{
    	"access_token": "{access token}",
    	"refresh_token": "{refresh token}"
	}
	```
 
  * ### Add user
	***
	#### Endpoint:
	` http://{manager-url}:{manager-port}/api/add_user `
	#### Protocol:
    ` POST `
	#### Body:
	```json
    {
        "username": "{username}",
        "password": "{password}",
        "permissions": {
            "create_queues": "{bool}",
            "delete_queues": "{bool}",
            "connect_nodes": "{bool}",
            "disconnect_nodes": "{bool}",
            "send_message": "{bool}",
            "get_message": "{bool}",
            "admin": "{bool}"
        }
    }
	```

	#### Request example:
	```sh
    curl -v -X POST http://localhost:5000/api/add_user \
    -H 'Authorization: {access token}' \
    -H 'Content-Type: application/json' \
    -d '{
            "username": "test",
            "password": "test",
            "permissions": {
                "create_queues": false,
                "delete_queues": false,
                "connect_nodes": true,
                "disconnect_nodes": true,
                "send_message": false,
                "get_message": true,
                "admin": false
            }
        }'
	```

	#### Response example:

	HTTP/ 1.1 201 CREATED