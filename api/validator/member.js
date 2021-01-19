const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const schemas = {
  login: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(6).required(),
    }),
  },
  register: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(6).required(),
      nameSurname: Joi.string().min(4).required(),
    }),
  },
  getmember: {
    [Segments.QUERY]: {
      id: Joi.objectId().required(),
    },
  },
  update: {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().min(5),
      password: Joi.string().min(6),
      nameSurname: Joi.string().min(4),
    }),
    [Segments.QUERY]: {
      id: Joi.objectId().required(),
    },
  },
  setMemberStatistic: {
    [Segments.BODY]: {
      isRightAnswer: Joi.boolean().required(),
      difficulty: Joi.number().min(1).required(),
    },
  },
  forgetPassword: {
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  },
  changePassword: {
    [Segments.PARAMS]: {
      token: Joi.string().required(),
    },
    [Segments.BODY]: {
      password: Joi.string().required(),
    },
  },
};
module.exports = schemas;
