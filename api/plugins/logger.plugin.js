const { createLogger, format, transports } = require('winston');
const Sentry = require('winston-transport-sentry-node').default;
const fs = require('fs');
const path = require('path');
const config = require('../../config');

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const options = {
  sentry: {
    dsn: config.sentry.dsn,
  },
  level: 'error',
};

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'prod' ? 'info' : 'debug',
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `<${info.timestamp}> ${info.level} [${info.label}]: ${info.message}`,
        ),
      ),
      silent: env === 'prod',
    }),
  ],
});
logger.add(new Sentry(options));
module.exports = logger;
