const { createLogger, format, transports } = require('winston');
const Sentry = require('winston-transport-sentry-node').default;
const discordService = require('../server/services/discord');
const { DISCORD_MESSAGE_TYPES } = require('../constant');
const config = require('../../config');

const env = process.env.NODE_ENV || 'development';

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
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    format.json(),
    format.splat(),
    format.colorize(),
    format.printf((info) => {
      if (info.level.includes('error')) {
        discordService.sendMessageToDiscord({ messageType: DISCORD_MESSAGE_TYPES.ERROR, message: info.message });
      }

      return `<${info.timestamp}> |${info.level}| : ${info.message} -  `;
    }),
  ),
  transports: [
    new transports.Console({
      json: true,
      prettyPrint: obj => JSON.stringify(obj),
      silent: env === 'prod',
    }),
  ],
});
logger.add(new Sentry(options));

module.exports = logger;
