const express = require('express');
const bodyParser = require('body-parser');
const mockdb = require('./static/mockdb.json')

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin',  req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});


// TOKEN
app.post('/token_verify_auth', (req, res) => {
  console.log('/token_verify_auth');
  const payload = mockdb.token_verify_auth
  res.json({ ...payload });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

