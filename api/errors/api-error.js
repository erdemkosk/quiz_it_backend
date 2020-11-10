/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
module.exports = class ApiError extends Error {
  constructor(message, code, statusCode = 500, data, args = []) {
    super(message);

    if (this.constructor === ApiError) {
      throw new TypeError('Abstract class "ApiError" cannot be instantiated directly.');
    }

    this.code = code;
    this.data = data;
    this.args = args;
    this.statusCode = statusCode;
  }
};
