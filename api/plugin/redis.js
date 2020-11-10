const util = require('util');
const redis = require('redis');
const logger = require('./logger');

const config = require('../../config');

const client = redis.createClient(config.redis);
client.hget = util.promisify(client.hget);

client.on('connect', () => {
  logger.info('Redis connected.');
});

client.on('error', (error) => {
  logger.error(`Redis error:\n${error}`);
  process.exit(1);
});

process.on('SIGINT', () => {
  client.quit();
  logger.warn('Redis disconnected through app termination (SIGINT).');
});

module.exports = {
  getClient: () => client,
};
