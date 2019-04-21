# Todos App

## Build & Run
* `./gradlew bootRun`

## HTML Endpoints

### `localhost:8080`

Retrieve HTML page communicating with backed via AJAX.

## REST API Endpoints

### `GET /todos`

Retrieve all Todos.

### `POST /todos`

Create Todo using request body in format:

```json
{
  "description": "Todo description"
}
```

### `GET /todos/{id}`

Retrieve Todo with specified ID.

### `PUT /todos/{id}`

Update Todo with specified ID. Request body should be in format:

```json
{
  "id": "1",
  "ready": true,
  "description": "Todo description"
}
```

IDs from path and body should be equal.

### `DELETE /todos/{id}`

Delete from storage Todo with specified ID.
