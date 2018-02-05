const express = require('express');
const builder = require('botbuilder');
const logger = require('morgan');
const bodyParser = require('body-parser');

const authMiddleware = require('./api/middlewares/auth');
const apiRoutes = require('./api/');
const handler = require('./handler');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
    appId: process.env.MS_APP_ID,
    appPassword: process.env.MS_APP_PWD
});

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
const bot = new builder.UniversalBot(connector, handler);

app.post('/messages', connector.listen());

// API Routes
app.use('/auth', (req, res) => {
  // TODO: Read the header and validate request with
  // `api-key` and `api-secret` and return generated `access_token`

  // const headers = req.headers;
  // const apiKey = headers['api-key'];
  // const apiSecret = headers['api-secret'];

  res.status(200)
    .send({
      status: {
        code: 200,
        message: 'OK'
      },
      access_token: '(access_token)'
    });
});

app.all('/api/*', [authMiddleware], (req, res, next) => {
  // Set Headers for CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use('/api', apiRoutes);

// Handle 404 requests
app.use((req, res) => {
  res.status(404)
    .send({
      status: {
        code: 404,
        message: 'Not Found'
      }
    })
});

app.set('PORT', process.env.PORT || 3978);
app.listen(app.get('PORT'), () => console.log('Server listening on %s', app.get('PORT')))