/* eslint-disable no-param-reassign */
exports.successResponse = ({ message, results, statusCode }) => ({
  message,
  error: false,
  code: statusCode,
  results,
});

exports.errorResponse = (message, statusCode, errorCode) => {
  // List of common HTTP request code
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];

  // Get matched code
  const findCode = codes.find(code => code === statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    message,
    code: statusCode,
    errorCode: errorCode || -1,
    error: true,
  };
};

exports.validation = errors => ({
  message: 'Validation errors',
  error: true,
  code: 422,
  errors,
});
