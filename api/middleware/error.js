/* eslint-disable no-unused-vars */

const { errorResponse } = require('../util/response');
const loggerPlugin = require('../plugin/logger');

module.exports = (err, req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  loggerPlugin.error(err.stack);

  return res.status(err.getCode()).json(
    errorResponse(err.message, err.getCode()),
  );
};
