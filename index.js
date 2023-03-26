require('dotenv').config();
const axios = require('axios');
const express = require('express');
const path = require('path');

const app = express();

//Public Assets
app.use(express.static('assets'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/assets/index.html'));
});

app.get('/auth', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get('/oauth-callback', (req, res) => {
  const { code } = req.query;

  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };
  const opts = { headers: { accept: 'application/json' } };
  axios
    .post('https://github.com/login/oauth/access_token', body, opts)
    .then((_res) => _res.data.access_token)
    .then((token) => {
      console.log('My token:', token);
      res.redirect(`/?token=${token}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});

app.listen(process.env.PORT, () =>
  console.log('listening on port ' + process.env.PORT)
);
