const jwt = require('jsonwebtoken');
const config = require('../../../config');

const generateToken = async ({ uuid, email, expiresIn }) => {
  const token = jwt.sign({
    uuid,
    email,
  },
  config.jwt.key,
  {
    expiresIn: expiresIn || config.jwt.expires,
  });

  return token;
};

const decodeToken = ({ token }) => {
  let decodedToken;

  jwt.verify(token, config.jwt.key, (err, decoded) => {
    if (err) throw new Error(err); // Manage different errors here (Expired, untrusted...)
    decodedToken = decoded; // If no error, token info is returned in 'decoded'
  });

  return decodedToken;
};

module.exports = {
  generateToken,
  decodeToken,
};
