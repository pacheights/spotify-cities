import express from "express";
import { TopArtistSuccessReponse } from "../types/spotify";
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const { getLocations } = require('../worker/scrape');
const { SECRET_KEYS } = require('../secret-keys');

const app = express();
const port = 443;
const frontend_port = 443;
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/authorize', (req, res) => {
  const { client_id } = SECRET_KEYS;
  const redirectUri = `http://localhost:${frontend_port}/`;
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
  .then(async (spotifyRes: TopArtistSuccessReponse) => {
    const artistIds = spotifyRes.items.map(artist => artist.id);
    res.send(await getLocations(artistIds))
  })
})

app.listen(port, () => console.log(`listening on port ${port}`))