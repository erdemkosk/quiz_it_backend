/* eslint-disable func-names */
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const expressWinston = require('express-winston');
const mongoSanitize = require('express-mongo-sanitize');
const limit = require('express-better-ratelimit');
const logger = require('./logger');


module.exports = function (app) {
  app.use(bodyParser.json({ limit: '10kb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());

  app.use(expressWinston.logger({
    msg: 'HTTP {{req.method}} {{res.statusCode}} {{req.url}} {{res.responseTime}}ms',
    winstonInstance: logger,
  }));

  app.use(limit({
    duration: 30000, // 30 seconds
    max: 30,
  }));

  app.use(mongoSanitize());
};
