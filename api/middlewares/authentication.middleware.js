/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const responseHelper = require('../plugins/response');
const config = require('../../config');

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.jwt.key, (err, decoded) => {
      if (err) {
        return res.json(responseHelper.generateErrorResponse({ message: 'Token is not valid.', code: 403 }));
      }
      req.decoded = decoded;
      next();
    });
  }
  else {
    return res.json(responseHelper.generateErrorResponse({ message: 'Auth token is not supplied', code: 403 }));
  }
};

module.exports = {
  checkToken,
};
