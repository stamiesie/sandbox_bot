const Youtube = require('youtube-api');
const fs = require('fs');
const { parse } = require('dotenv/types');

const clientSecretRaw = fs.readFileSync(`${__dirname}/client_secret.json`);
const clientSecrets = JSON.parse(clientSecretRaw);

let oauth = Youtube.authenticate({
type: 'oath',
client_id: clientSecrets.web.client_id,
client_secret: clientSecrets.web.client_secret,
redirect_url: clientSecrets.web.redirect_uris[0],
});

module.exports = {
    Youtube, oauth
};