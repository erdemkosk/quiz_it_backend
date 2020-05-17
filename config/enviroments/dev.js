module.exports = {
  env: 'dev',
  server: {
    port: process.env.PORT || 3000,
  },
  mongodb: {
    url: process.env.MONGODB_URL || 'mongodb+srv://mek:Edoerdem6@mongomek-f9yax.mongodb.net/quiz?retryWrites=true&w=majority',
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
    host: 'redis-11724.c55.eu-central-1-1.ec2.cloud.redislabs.com',
    port: 11724,
    password: '5jEwQXK5qo6UxzMymKx9d8SjnUcOX2EW',
  },
  rabbitmq: {
    url: 'amqp://tgkfojst:5LBEealvuxDQ19ZTev7vssXk8QdC51M6@hawk.rmq.cloudamqp.com/tgkfojst',
  },
};
