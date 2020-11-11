/* eslint-disable import/no-dynamic-require */
// eslint-disable-next-line import/no-dynamic-require
const ip = require('ip');

const env = process.env.NODE_ENV || 'debug';
let enviromentConfig = require(`./enviroments/${env}`);

const swagger = {
  enabled: process.env.SWAGGER_ENABLED || true,
  host: process.env.SWAGGER_HOST || `${ip.address()}:${enviromentConfig.server.port}`,
};

enviromentConfig = {
  ...enviromentConfig,
  swagger,
};

module.exports = enviromentConfig;
