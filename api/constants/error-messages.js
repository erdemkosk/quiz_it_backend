const { BadRequestGenericError } = require('../errors/generic');

module.exports = {
  UNKNOWN: {
    error: 'UnknownError',
    message: 'unknown error',
    code: -1,
  },
  VALIDATION: {
    error: 'ValidationError',
    code: -2,
  },
  MICROSERVICE: {
    error: 'MicroserviceError',
    message: 'microservice error',
    code: -3,
  },
  NOT_FOUND: {
    parent: BadRequestGenericError,
    error: 'NotFoundError',
    message: ' not found.',
    code: 404,
  },
  INVALID_ID: {
    parent: BadRequestGenericError,
    error: 'InvalidIDError',
    message: 'Id parameter is not correct mongoId.',
    code: 404,
  },
};
