/* eslint-disable consistent-return */
const { successResponse } = require('../../util/response');
const questionService = require('../services/question');
const formatter = require('../../formatter/question');

const getQuestion = async (req, res, next) => {
  try {
    const { difficulty } = req.query;

    const {
      question,
      answers,
      correctAnswer,
    } = await questionService.getQuestion({ difficulty });

    return res.status(200).send(successResponse({ results: formatter(question, answers, correctAnswer) }));
  }
  catch (error) {
    next(error);
  }
};

const getFillInBlanksQuestion = async (req, res, next) => {
  try {
    const { difficulty } = req.query;

    const {
      question,
      answers,
      correctAnswer,
    } = await questionService.getFillInBlanksQuestion({ difficulty });

    return res.status(200).send(successResponse({ results: formatter(question, answers, correctAnswer) }));
  }
  catch (error) {
    next(error);
  }
};

const addReport = async (req, res, next) => {
  try {
    const { reportMessage, questionWordId, userId } = req.body;

    const { report } = await questionService.addReport({ reportMessage, userId, questionWordId });

    return res.status(200).send(successResponse({ results: report }));
  }
  catch (error) {
    next(error);
  }
};

module.exports = {
  getQuestion,
  addReport,
  getFillInBlanksQuestion,
};
