const mongoose = require('mongoose');
const config = require('../../config');
const logger = require('./logger');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongodb.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

mongoose.connection.on('connected', () => {
  logger.info('Mongo Db connected.');
});

mongoose.connection.on('disconnected', () => {
  logger.info('Mongo Db disconnected.');
});

mongoose.connection.on('error', (error) => {
  logger.error(`Mongo Db error:\n${error}`);
  process.exit(1);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.warn('Mongo Db disconnected through app termination (SIGINT).');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  mongoose.connection.close(() => {
    logger.warn('Mongo Db disconnected through app termination (SIGTERM).');
    process.exit(0);
  });
});

process.once('SIGUSR2', () => {
  mongoose.connection.close(() => {
    logger.warn('Database disconnected through app termination (SIGUSR2).');
    process.kill(process.pid, 'SIGUSR2');
  });
});
