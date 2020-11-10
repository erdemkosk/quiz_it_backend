const Word = require('../../data/models/word');
const Report = require('../../data/models/report');

const getQuestion = async ({ difficulty }) => (
  Word.aggregate(
    [
      { $match: { difficulty } }, { $sample: { size: 4 } },
    ],
  )
);

const addReport = async ({ reportMessage, questionWordId, userId }) => (
  new Report({ reportMessage, questionWordId, userId }).save()
);

module.exports = {
  getQuestion,
  addReport,
};
