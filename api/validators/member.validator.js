const { body, query } = require('express-validator');

const loginValidationRules = () => [
  body('email').exists().isEmail(),
  body('password').exists(),
];

const registerValidationRules = () => [
  body('nameSurname').exists(),
  body('email').exists().isEmail(),
  body('password').exists(),
];

const getMemberValidationRules = () => [
  query('_id').exists().isLength({ min: 24, max: 24 }).withMessage('User Id must be 24 character.'),
];

module.exports = {
  loginValidationRules,
  registerValidationRules,
  getMemberValidationRules,
};
