/* eslint-disable global-require */
require('dotenv').config();
const path = require('path');
const express = require('express');
const ip = require('ip');
const config = require('./config');

const logger = require('./api/plugins/logger.plugin');
const errorMiddleware = require('./api/middlewares/error.middleware');

const app = express();

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

require('./api/plugins/mongodb.plugin');
require('./api/plugins/security.plugin')(app);
require('./api/server/routes')(app);

if (config.swagger.enabled) {
  require('./api/plugins/swagger.plugin')(app);
}

app.use(errorMiddleware);

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', express.static(path.join(__dirname, 'public')));

// eslint-disable-next-line max-len
app.listen(config.server.port, () => (config.swagger.enabled ? logger.info(`HTTP server is running at: \n - Api: http://${ip.address()}:${config.server.port} \n - Swagger: http://${ip.address()}:${config.server.port}/api-docs`) :
  logger.info(`HTTP server is running at: \n - Api: http://${ip.address()}:${config.server.port}`)));
