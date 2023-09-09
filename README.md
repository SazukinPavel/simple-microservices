# A simple app to save user messages.
1. api-gateway is a server proxy that provides rest interfaces for working with users, messages and logs.
2. auth-service - user authentication service. Uses postgres.
3. message-service - service responsible for working with messages. Uses mysql.
4. logs-service - logs events on the server and http requests. Uses mongodb.

## Project Setup (with dev .env)
```
docker compose --env-file .env.development build
docker compose --env-file .env.development up
```