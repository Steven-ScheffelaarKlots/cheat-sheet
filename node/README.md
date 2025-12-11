# Node Express Example

Simple Express server with two endpoints for learning and testing.

## Installation

```bash
npm install
```

## Usage

Start the server:
```bash
npm start
```

Or use nodemon for auto-restart during development:
```bash
npm run dev
```

## Endpoints

### 1. GET `/api/lorem`
Returns lorem ipsum text data in JSON format.

**Example:**
```bash
curl http://localhost:3000/api/lorem
```

### 2. POST `/api/submit-form`
Accepts form data and logs it to the console.

**Example with JSON:**
```bash
curl -X POST http://localhost:3000/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "message": "Hello!"}'
```

**Example with form data:**
```bash
curl -X POST http://localhost:3000/api/submit-form \
  -d "name=John Doe" \
  -d "email=john@example.com" \
  -d "message=Hello!"
```
