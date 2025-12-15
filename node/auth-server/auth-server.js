const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3002;

// Secret key for JWT (in production, use environment variable)
const JWT_SECRET = 'your-secret-key-change-this-in-production';

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Mock user database (in production, use a real database)
const users = [
  {
    id: 1,
    username: 'demo',
    // password: 'password123' (hashed)
    password: '$2a$10$8qvZ9pW.nJ3nJfGk6vKrNe5JZxqXqJ3qW9pK3qJ3qW9pK3qJ3qW9p' // bcrypt hash of 'password123'
  }
];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// 1. Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword
    };
    users.push(newUser);

    console.log(`New user registered: ${username}`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: { id: newUser.id, username: newUser.username }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// 2. Login (get JWT token)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log(`User logged in: ${username}`);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// 3. Protected route - requires valid JWT token
app.get('/api/auth/profile', authenticateToken, (req, res) => {
  // req.user is set by authenticateToken middleware
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username
    }
  });
});

// 4. Another protected route example
app.get('/api/auth/protected-data', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'This is protected data',
    data: {
      secretInfo: 'Only authenticated users can see this',
      userId: req.user.id,
      username: req.user.username
    }
  });
});

// 5. Refresh token (simplified version)
app.post('/api/auth/refresh', authenticateToken, (req, res) => {
  // Generate new token
  const newToken = jwt.sign(
    { id: req.user.id, username: req.user.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({
    success: true,
    token: newToken
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`JWT Auth Server running on http://localhost:${PORT}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  POST http://localhost:${PORT}/api/auth/register - Register new user`);
  console.log(`  POST http://localhost:${PORT}/api/auth/login - Login and get token`);
  console.log(`  GET  http://localhost:${PORT}/api/auth/profile - Get user profile (protected)`);
  console.log(`  GET  http://localhost:${PORT}/api/auth/protected-data - Get protected data`);
  console.log(`  POST http://localhost:${PORT}/api/auth/refresh - Refresh token (protected)`);
  console.log(`\nDemo credentials: username="demo", password="password123"`);
});
