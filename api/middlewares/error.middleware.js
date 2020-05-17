/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const responsePlugin = require('../plugins/response.plugin');
const loggerPlugin = require('../plugins/logger.plugin');

module.exports = (err, req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(responsePlugin.generateErrorResponse(
    { message: err.message, code: err.statusCode },
  ));
  loggerPlugin.error(err.stack);
};
