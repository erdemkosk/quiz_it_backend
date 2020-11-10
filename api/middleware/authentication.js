/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const config = require('../../config');
const { MESSAGES } = require('../constant');
const { errorResponse } = require('../util/response');

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config.jwt.key, (err, decoded) => {
      if (err) {
        return res.status(403).send(errorResponse(MESSAGES.TOKEN_IS_NOT_VALID, 403));
      }
      req.decoded = decoded;
      next();
    });
  }
  else {
    return res.status(403).send(errorResponse(MESSAGES.TOKEN_IS_NOT_SUPPLIED, 403));
  }
};

module.exports = {
  checkToken,
};
