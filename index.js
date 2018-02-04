const express = require('express');
const builder = require('botbuilder');

const handler = require('./handler');

const app = express();

// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
    appId: process.env.MS_APP_ID,
    appPassword: process.env.MS_APP_PWD
});

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
const bot = new builder.UniversalBot(connector, handler);

app.post('/', connector.listen())

app.set('PORT', process.env.PORT || 3978);
app.listen(app.get('PORT'), () => console.log('Server listening on %s', app.get('PORT')))