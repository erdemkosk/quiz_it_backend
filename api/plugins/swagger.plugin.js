/* eslint-disable global-require */
/* eslint-disable func-names */

const config = require('../../config');

const options = {
  swaggerDefinition: {
    info: {
      description: 'Quiz app api',
      title: 'Test-Me Api Swagger',
      version: '1.0.0',
    },
    host: config.swagger.host,
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
