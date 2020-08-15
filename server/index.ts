import express from "express";
const cors = require('cors');
const fetch = require('node-fetch');
const SECRET_KEYS = require('../secret-keys');

const app = express();
const port = 443;
app.use(express.json());
app.use(cors());

app.get('/authorize', (req, res) => {
  const { client_id } = SECRET_KEYS;
  const redirectUri = 'http://localhost:3000/';
  const scope = 'user-read-private user-read-email user-top-read';
  const responseType = 'token';
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;

  res.redirect(authUrl);
})

app.get('/artists', (req, res) => {
  const authToken = req.query.token;
  const topArtistsUrl = 'https://api.spotify.com/v1/me/top/artists';
  fetch(topArtistsUrl, {
    headers: {
      "Authorization": `Bearer ${authToken}`
    }
  })
  .then((res: any) => res.json())
  .then((json: any) => res.send(json))
})

app.listen(port, () => console.log(`listening on port ${port}`))