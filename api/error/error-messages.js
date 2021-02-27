/* eslint-disable no-unused-vars */
const {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
} = require('./model/errors');

module.exports = {
  MemberNotFound: {
    parentError: NotFoundError,
    message: 'Member not found.',
    code: 1000,
  },
  MemberCannotCreated: {
    parentError: BadRequestError,
    message: 'Member cannot created.',
    code: 1001,
  },
  MemberCannotUpdated: {
    parentError: BadRequestError,
    message: 'Member cannot updated.',
    code: 1002,
  },
  MemberAlreadyCreated: {
    parentError: BadRequestError,
    message: 'Member already created.',
    code: 1003,
  },
  WordNotFound: {
    parentError: NotFoundError,
    message: 'Word not found.',
    code: 1004,
  },
  WordCannotCreated: {
    parentError: BadRequestError,
    message: 'Word cannot created.',
    code: 1005,
  },
  WordCannotUpdated: {
    parentError: BadRequestError,
    message: 'Word cannot updated.',
    code: 1006,
  },
  QuestionNotFound: {
    parentError: NotFoundError,
    message: 'Question not found.',
    code: 1007,
  },
  ReportCannotCreated: {
    parentError: BadRequestError,
    message: 'Report cannot created.',
    code: 1008,
  },
  TokenIsNotValid: {
    parentError: UnauthorizedError,
    message: 'Token is not valid.',
    code: 1009,
  },
  TokenIsNotSupplied: {
    parentError: UnauthorizedError,
    message: 'Auth token is not supplied.',
    code: 1010,
  },
};
