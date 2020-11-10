const { Joi, Segments } = require('celebrate');
const { QUESTION_DIFFICULTY } = require('../constant');
Joi.objectId = require('joi-objectid')(Joi);

const schemas = {
  getWord: {
    [Segments.PARAMS]: {
      id: Joi.objectId().required(),
    },
  },
  getWords: {
    [Segments.QUERY]: {
      page: Joi.number().min(0),
      limit: Joi.number().min(0),
      filter: Joi.string().allow(null, ''),
    },
  },
  addWord: {
    [Segments.BODY]: Joi.object().keys({
      word: Joi.string().min(1).required(),
      translated: Joi.string().min(1).required(),
    }),
  },
  updateWord: {
    [Segments.BODY]: Joi.object().keys({
      word: Joi.string().min(1).required(),
      translated: Joi.string().min(1).required(),
      difficulty: Joi.number().min(1).valid(
        QUESTION_DIFFICULTY.A1,
        QUESTION_DIFFICULTY.A2,
        QUESTION_DIFFICULTY.B1,
        QUESTION_DIFFICULTY.B2,
        QUESTION_DIFFICULTY.C1,
        QUESTION_DIFFICULTY.C2,
      ).required(),
    }),
    [Segments.PARAMS]: {
      id: Joi.objectId().required(),
    },
  },
  deleteWord: {
    [Segments.PARAMS]: {
      id: Joi.objectId().required(),
    },
  },
};

module.exports = schemas;
