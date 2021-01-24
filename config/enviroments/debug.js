const server = {
  port: process.env.PORT || 4000,
};

module.exports = {
  env: 'debug',
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
  server,
  mongodb: {
    url: process.env.MONGODB_URL || '',
  },
  jwt: {
    key: process.env.JWT_KEY || 'testJwt',
    expires: process.env.JWT_EXPIRES || '3650d',
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || '',
  },
  redis: {
    host: process.env.REDIS_HOST || '',
    port: process.env.REDIS_PORT || 0,
    password: process.env.REDIS_PASSWORD || '',
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || '',
    enable: process.env.RABBITMQ_ENABLE || true,
  },
  exporter: {
    enable: process.env.EXPORTER_ENABLE || true,
  },
  discord: {
    enable: process.env.DISCORD_ENABLE || true,
    url: process.env.DISCORD_WEB_HOOK_URL ||
    'https://discord.com/api/webhooks/774767410816745472/S3pc2Tusvmpx0yJOmaqGFVdLW7cvh7ai6QQHLUCRY1pGqZAN6L26_K43iolKeHuQaLKD',
  },
};
