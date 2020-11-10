const BadRequestGenericError = require('./bad-request');
const AuthenticationGenericError = require('./authentication');
const AuthorizationGenericError = require('./authorization');
const UncaughtGenericError = require('./uncaught');

module.exports = {
  BadRequestGenericError,
  AuthenticationGenericError,
  AuthorizationGenericError,
  UncaughtGenericError,
};
