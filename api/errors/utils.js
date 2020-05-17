/* eslint-disable max-classes-per-file */
/* eslint-disable require-jsdoc */
const AoiError = require('./api-error');

/**
 * Creates an error group, that may be extended further to create custom errors.
 *
 * @param klass the name of the error group
 * @param statusCodeDefault the default http status code to use for this type of errors
 * @returns {*}
 */
const createGenericErrorType = (klass, statusCodeDefault = 500) => ({
  [klass]:
    class extends AoiError {
      constructor(message, code, statusCode, data, args) {
        super(message, code, statusCode || statusCodeDefault, data, args);

        if (this.constructor.name === klass) {
          throw new TypeError(`Abstract class "${klass}" cannot be instantiated directly.`);
        }
      }
    },
}[klass]);

/**
 * Creates a custom error type to be used, when throwing and checking errors.
 *
 * @param extendClass one of the members of group of errors, that extend GetirError
 * @param klass the name of the class to be created
 * @param message the message for the error instances to have
 * @param code the unique code for the error
 * @param statusCode the status code to use when responding to http requests
 * @returns {*}
 */
const createCustomErrorType = (extendClass, klass, message, code, statusCode) => ({
  [klass]:
    class extends extendClass {
      constructor(data, ...args) {
        super(message, code, statusCode, data, args);
      }
    },
}[klass]);

module.exports = {
  createGenericErrorType,
  createCustomErrorType,
};
