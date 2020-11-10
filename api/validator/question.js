const { Joi, Segments } = require('celebrate');
const { QUESTION_DIFFICULTY } = require('../constant');
Joi.objectId = require('joi-objectid')(Joi);

const schemas = {
  getQuestion: {
    [Segments.QUERY]: Joi.object().keys({
      difficulty: Joi.number().min(1).valid(
        QUESTION_DIFFICULTY.A1,
        QUESTION_DIFFICULTY.A2,
        QUESTION_DIFFICULTY.B1,
        QUESTION_DIFFICULTY.B2,
        QUESTION_DIFFICULTY.C1,
        QUESTION_DIFFICULTY.C2,
      ).required(),
    }),
  },
  addReport: {
    [Segments.BODY]: Joi.object().keys({
      reportMessage: Joi.string().min(4).required(),
      wordId: Joi.objectId().required(),
      userId: Joi.objectId().required(),
    }),
  },
};

module.exports = schemas;
