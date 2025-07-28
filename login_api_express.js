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
  name: 'John Doe',
  mobileNumber: '9817634413',
  userId: '12345'
};

// Unified API Endpoint
app.post('/scoreMeListenApi', (req, res) => {
  const { processName, data } = req.body;

  if (processName !== 'verifyLogin') {
    return res.status(400).json({ status: 'FAILURE', responseMessage: 'Invalid processName', responseCode: 'ERR001' });
  }

  const { username, password } = data || {};

  if (username === user.username && password === user.password) {
    return res.status(200).json({
      status: 'SUCCESS',
      data: {
        username: user.username,
        name: user.name,
        mobileNumber: user.mobileNumber,
        userId: user.userId
      },
      responseMessage: 'Username and password verified.',
      responseCode: 'SRO038'
    });
  } else {
    return res.status(401).json({
      status: 'FAILURE',
      responseMessage: 'Invalid username or password',
      responseCode: 'SRO039'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});