# JWT Authentication Example

Express server with JWT (JSON Web Token) authentication.

## Installation

```bash
npm install
```

## Usage

Start the JWT auth server:
```bash
node auth-server.js
```

Server runs on `http://localhost:3002`

## API Endpoints

### 1. Register User
```bash
curl -X POST http://localhost:3002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "mypassword"}'
```

### 2. Login (Get JWT Token)
```bash
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "demo", "password": "password123"}'
```

Response includes a JWT token:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "username": "demo" }
}
```

### 3. Access Protected Route (Profile)
```bash
curl http://localhost:3002/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 4. Access Protected Data
```bash
curl http://localhost:3002/api/auth/protected-data \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 5. Refresh Token
```bash
curl -X POST http://localhost:3002/api/auth/refresh \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Demo Credentials

- **Username:** demo
- **Password:** password123

## How It Works

1. **Registration:** User provides username/password, password is hashed with bcrypt
2. **Login:** User credentials are verified, JWT token is generated (expires in 1 hour)
3. **Authentication:** Client includes token in `Authorization: Bearer <token>` header
4. **Protected Routes:** Middleware verifies JWT token before allowing access
5. **Token Refresh:** Generate new token before expiration

## Security Notes

⚠️ This is a learning example. For production:
- Use environment variables for JWT_SECRET
- Use a real database (not in-memory array)
- Implement refresh token rotation
- Add rate limiting
- Use HTTPS only
- Consider using refresh/access token pair
- Add token blacklisting for logout
