const { body, query } = require('express-validator');

const addWordValidationRules = () => [
  body('word').exists(),
  body('translated').exists(),
];

const updateWordValidationRules = () => [
  body('word').exists(),
  body('translated').exists(),
];

module.exports = {
  addWordValidationRules,
  updateWordValidationRules,
};
