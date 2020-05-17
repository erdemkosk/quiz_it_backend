/* eslint-disable import/no-dynamic-require */
// eslint-disable-next-line import/no-dynamic-require
const env = process.env.NODE_ENV || 'dev';
const enviromentConfig = require(`./enviroments/${env}`);

module.exports = enviromentConfig;
