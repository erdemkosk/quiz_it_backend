const ip = require('ip');
const app = require('./main.js');
const config = require('./config');
const logger = require('./api/plugin/logger');

require('./api/plugin/mongodb');

app.listen(config.server.port, () => (config.swagger.enabled ? logger.info(`HTTP server is running at: \n - 
Api: http://${ip.address()}:${config.server.port} \n - Swagger: http://${ip.address()}:${config.server.port}/api-docs`) :
  logger.info(`HTTP server is running at: \n - Api: http://${ip.address()}:${config.server.port}`)));
