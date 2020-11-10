/* eslint-disable require-jsdoc */
module.exports = class ResponseLogic {
  static generateSuccessResponse({ data, message }) {
    return {
      code: 200,
      status: 'success',
      message: message || 'Data received successfully.',
      data,
    };
  }

  static generateErrorResponse({ error, message, code }) {
    return {
      code,
      status: 'fail',
      message: message || 'There was a problem fetching data.',
      error,
    };
  }
};
