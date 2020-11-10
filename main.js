require('dotenv').config();
const path = require('path');
const express = require('express');
const ip = require('ip');
const { errors } = require('celebrate');
const config = require('./config');

const errorMiddleware = require('./api/middleware/error');

const app = express();

if (config.exporter.enable) {
  // eslint-disable-next-line global-require
  app.use(require('api-express-exporter')({
    host: ip.address(),
  }));
}


app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

require('./api/plugin/security')(app);
require('./api/server/routes')(app);

app.use(errors({ statusCode: 422 }));

if (config.swagger.enabled) {
  // eslint-disable-next-line global-require
  require('./api/plugin/swagger')(app);
}

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', express.static(path.join(__dirname, 'public')));

app.use(errorMiddleware);

module.exports = app;
