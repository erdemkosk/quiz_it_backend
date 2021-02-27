/* eslint-disable no-return-assign */
const CUSTOM_ERRORS = require('../error/error-messages');

const generateCustomErrors = (extendClass, generatedClass, message, code, statusCode) => ({
  [generatedClass]:
    class extends extendClass {
      constructor(data, ...args) {
        super(message, code, statusCode, data, args);
      }
    },
}[generatedClass]);

module.exports = (
  Object
    .keys(CUSTOM_ERRORS)
    // eslint-disable-next-line no-return-assign
    // eslint-disable-next-line no-param-reassign
    .reduce((acc, customError) => ({
      ...acc,
      [customError]: generateCustomErrors(CUSTOM_ERRORS[customError].parentError,
        customError,
        CUSTOM_ERRORS[customError].message,
        CUSTOM_ERRORS[customError].code),
    }), {})
);
