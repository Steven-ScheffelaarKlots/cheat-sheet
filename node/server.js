const express = require('express');
const app = express();
const PORT = 3001;

// CORS middleware - allow requests from frontend on port 3000
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint 1: GET request that returns lorem ipsum data
app.get('/api/lorem', (req, res) => {
  const loremData = {
    title: 'Lorem Ipsum',
    paragraphs: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    ],
    timestamp: new Date().toISOString()
  };
  
  res.json(loremData);
});

app.get('/api/multiply/:num', (req, res) => {
  const num = Number(req.params.num);
  if (!Number.isInteger(num)) {
    return res.status(400).json({ error: 'Input must be an integer' });
  }
  res.json({ input: num, result: num * 50 });
});

// Endpoint 2: POST request that accepts form data and logs it
app.post('/api/submit-form', (req, res) => {
  console.log('=== Form Data Received ===');
  console.log(req.body);
  console.log('========================');
  
  res.json({
    success: true,
    message: 'Form data received and logged to console',
    receivedData: req.body
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET  http://localhost:${PORT}/api/lorem`);
  console.log(`  POST http://localhost:${PORT}/api/submit-form`);
});
