const questionDataAccess = require('../../data/data-access/question');
const logger = require('../../plugin/logger');
const questionLogic = require('../../logic/question');
const {
  QuestionNotFound,
  ReportCannotCreated,
} = require('../../util/error');

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
    throw new QuestionNotFound();
  }

  return {
    question,
    answers,
    correctAnswer,
  };
};

const getFillInBlanksQuestion = async ({ difficulty = 1 }) => {
  const words = await questionDataAccess.getFillInBlanksQuestion({ difficulty, sample: 1 });
  const question = words[0];

  const planingToRemoveCharNumber = questionLogic.generateRandomNumber(question.word.length);
  const planingToRemoveChar = question.word.charAt(planingToRemoveCharNumber);

  const charIsVowel = questionLogic.isVowels(planingToRemoveChar);

  question.word = `${questionLogic.removeCharAtIndex(planingToRemoveCharNumber + 1, question.word.trim())} - ${question.translated.trim()}`;

  let answers = [planingToRemoveChar.toLowerCase()];

  answers = [...answers, ...questionLogic.generateAnswersForBlankInFills(planingToRemoveChar, charIsVowel)];

  answers = questionLogic.getShuffledArr(answers);

  const correctAnswer = answers.findIndex(answer => answer === planingToRemoveChar.toLowerCase());

  if (!words || !question || !answers) {
    logger.error('[QuestionService - getFillInBlanksQuestion failed]%o', {
      words,
      correctAnswer,
      question,
      answers,
    });
    throw new QuestionNotFound();
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
    throw new ReportCannotCreated();
  }

  return {
    report,
  };
};

module.exports = {
  getQuestion,
  addReport,
  getFillInBlanksQuestion,
};
