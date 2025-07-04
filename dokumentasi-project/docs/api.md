# API Documentation

## Overview

This document provides detailed information about the API endpoints available in the project. It includes the request and response formats, as well as examples to help developers interact with the API effectively.

## Base URL

The base URL for all API requests is:

```
https://api.example.com/v1
```

## Endpoints

### 1. Get Messages

- **Endpoint:** `/messages`
- **Method:** `GET`
- **Description:** Retrieves a list of messages.
- **Request Parameters:**
  - `conversationId` (optional): The ID of the conversation to filter messages.
  
- **Response Format:**
  ```json
  {
    "messages": [
      {
        "id": "string",
        "content": "string",
        "sender": "string",
        "timestamp": "string"
      }
    ]
  }
  ```

- **Example Request:**
  ```
  GET /messages?conversationId=12345
  ```

- **Example Response:**
  ```json
  {
    "messages": [
      {
        "id": "msg_1",
        "content": "Hello, how can I help you?",
        "sender": "bot",
        "timestamp": "2023-10-01T12:00:00Z"
      }
    ]
  }
  ```

### 2. Send Message

- **Endpoint:** `/messages`
- **Method:** `POST`
- **Description:** Sends a new message to the conversation.
- **Request Body:**
  ```json
  {
    "conversationId": "string",
    "content": "string",
    "sender": "string"
  }
  ```

- **Response Format:**
  ```json
  {
    "id": "string",
    "content": "string",
    "sender": "string",
    "timestamp": "string"
  }
  ```

- **Example Request:**
  ```json
  POST /messages
  {
    "conversationId": "12345",
    "content": "I need help with my account.",
    "sender": "user"
  }
  ```

- **Example Response:**
  ```json
  {
    "id": "msg_2",
    "content": "I need help with my account.",
    "sender": "user",
    "timestamp": "2023-10-01T12:01:00Z"
  }
  ```

### 3. Clear Conversation

- **Endpoint:** `/conversations/{id}/clear`
- **Method:** `DELETE`
- **Description:** Clears all messages in a specific conversation.
- **Path Parameters:**
  - `id`: The ID of the conversation to clear.

- **Response Format:**
  ```json
  {
    "status": "success",
    "message": "Conversation cleared successfully."
  }
  ```

- **Example Request:**
  ```
  DELETE /conversations/12345/clear
  ```

- **Example Response:**
  ```json
  {
    "status": "success",
    "message": "Conversation cleared successfully."
  }
  ```

## Error Handling

All API responses include a status code and a message. Common error responses include:

- **400 Bad Request:** The request was invalid.
- **404 Not Found:** The requested resource was not found.
- **500 Internal Server Error:** An error occurred on the server.

## Conclusion

This API documentation provides the necessary information to interact with the project's API. For further assistance, please refer to the FAQ section or contact support.