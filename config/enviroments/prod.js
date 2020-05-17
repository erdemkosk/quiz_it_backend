module.exports = {
  env: 'prod',
  server: {
    port: process.env.PORT || 4000,
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
    enabled: process.env.SWAGGER_ENABLED || false,
  },
};
