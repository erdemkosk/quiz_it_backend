const questionDataAccess = require('../../data/data-access/question');
const logger = require('../../plugin/logger');
const questionLogic = require('../../logic/question');
const { NotFound } = require('../../util/error');
const { MESSAGES } = require('../../constant');

const getQuestion = async ({ difficulty = 1 }) => {
  const words = await questionDataAccess.getQuestion({ difficulty });
  const correctAnswer = questionLogic.generateRandomNumber(words.length);
  const question = words[correctAnswer];
  const answers = words.map(word => word.translated.trim());

  if (!words || !question || !answers) {
    logger.error('[QuestionService - getQuestion failed]%o', {
      words,
      correctAnswer,
      question,
      answers,
    });
    throw new NotFound(MESSAGES.QUESTION_NOT_FOUND);
  }

  return {
    question,
    answers,
    correctAnswer,
  };
};

const addReport = async ({ reportMessage, questionWordId, userId }) => {
  const report = await questionDataAccess.addReport({ reportMessage, questionWordId, userId });

  if (!report) {
    logger.error('[QuestionService - getQuestion failed]%o', {
      reportMessage,
      questionWordId,
      userId,
    });
    throw new NotFound(MESSAGES.REPORT_CANNOT_CREATED);
  }

  return {
    report,
  };
};

module.exports = {
  getQuestion,
  addReport,
};
