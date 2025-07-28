// login_api_express.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8072;
const SECRET_KEY = 'your_secret_key';

app.use(cors());
app.use(bodyParser.json());

// Dummy user (replace with DB if needed)
const user = {
  username: 'test123',
  password: 'password123',
  name: 'Test User'
};

// Unified API Endpoint
app.post('/scoreMeListenApi', (req, res) => {
  const { processName, data } = req.body;

  if (processName !== 'verifyLogin') {
    return res.status(400).json({ message: 'Invalid processName' });
  }

  const { username, password } = data || {};

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username: user.username, name: user.name }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', token });
  } else {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
