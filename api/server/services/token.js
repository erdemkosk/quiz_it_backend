const jwt = require('jsonwebtoken');
const config = require('../../../config');

const generateToken = async ({ uuid, email }) => {
  const token = jwt.sign({
    uuid,
    email,
  },
  config.jwt.key,
  {
    expiresIn: config.jwt.expires,
  });

  return token;
};

module.exports = {
  generateToken,
};
