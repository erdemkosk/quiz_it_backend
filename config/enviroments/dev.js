module.exports = {
  env: 'dev',
  server: {
    port: process.env.PORT || 3000,
  },
  mongodb: {
    url: process.env.MONGODB_URL || '',
  },
  jwt: {
    key: process.env.JWT_KEY || '',
    expires: process.env.JWT_EXPIRES || '2d',
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || '',
  },
  swagger: {
    enabled: process.env.SWAGGER_ENABLED || true,
  },
  redis: {
    host: process.env.REDIS_HOST || '',
    port: process.env.REDIS_PORT || 0,
    password: process.env.REDIS_PASSWORD || '',
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || '',
  },
};
