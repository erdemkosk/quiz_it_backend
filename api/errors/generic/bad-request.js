const { createGenericErrorType } = require('../utils');

module.exports = createGenericErrorType('BadRequestGenericError', 404);
