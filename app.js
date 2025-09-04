// index.js
const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello, Node.js App is running 🚀');
});

// Example API route
app.get('/api/clinics', (req, res) => {
  res.json([
    { id: 1, name: 'City Clinic', subscription: 'ACTIVE' },
    { id: 2, name: 'Green Hospital', subscription: 'EXPIRED' }
  ]);
});

// Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
