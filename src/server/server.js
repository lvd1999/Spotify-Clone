const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.post('/login', (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http:localhost:3000',
    clientId: '9fcb47cd6db644baa7575dcf80494581',
    clientSecret: 'd9c8be53a8bc4d10b5b2aee5cb3367c1',
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});
