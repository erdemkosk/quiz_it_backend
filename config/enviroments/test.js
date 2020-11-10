const server = {
  port: process.env.PORT || 3000,
};


module.exports = {
  env: 'test',
  server,
  sentry: {
    dsn: process.env.SENTRY_DSN || '',
  },
  exporter: {
    enable: false,
  },
  discord: {
    enable: process.env.DISCORD_ENABLE || false,
    url: process.env.DISCORD_WEB_HOOK_URL || '',
  },
};
