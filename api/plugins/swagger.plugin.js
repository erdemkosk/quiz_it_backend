/* eslint-disable global-require */
/* eslint-disable func-names */

const options = {
  swaggerDefinition: {
    info: {
      description: 'Quiz app api',
      title: 'Test-Me Api Swagger',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    basePath: '/api',
    produces: [
      'application/json',
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: '',
      },
    },
    security: [
      {
        JWT: [],
      },
    ],
  },
  basedir: __dirname, // app absolute path
  files: ['../server/routes/*.js'], // Path to the API handle folder
};

module.exports = function (app) {
  const expressSwagger = require('express-swagger-generator')(app);
  expressSwagger(options);
};
