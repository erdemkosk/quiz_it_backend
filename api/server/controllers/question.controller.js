/* eslint-disable consistent-return */
const responseHelper = require('../../plugins/response.plugin');
const questionService = require('../services/question.service');

const getQuestion = async (req, res, next) => {
  try {
    let { difficulty } = req.query;
    difficulty = difficulty ? Number(difficulty) : 1;

    const words = await questionService.getQuestion({ difficulty });
    const randomNumber = Math.floor(Math.random() * words.length);
    const question = words[randomNumber];
    const answers = [];

    for (let index = 0; index < words.length; index += 1) {
      answers.push(words[index].translated);
    }

    return res.status(200).send(responseHelper.generateSuccessResponse({
      data: {
        questionWordId: question._id,
        question: question.word,
        answers,
        answer: randomNumber,
      },
    }));
  }
  catch (error) {
    next(error);
  }
};

const addReport = async (req, res, next) => {
  try {
    const { reportMessage, questionWordId, userId } = req.body;

    const report = await questionService.addReport({ reportMessage, userId, questionWordId });

    return res.status(200).send(responseHelper.generateSuccessResponse({
      data: report,
    }));
  }
  catch (error) {
    next(error);
  }
};

module.exports = {
  getQuestion,
  addReport,
};
