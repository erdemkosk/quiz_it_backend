const Word = require('../../data/models/word');
const Report = require('../../data/models/report');

const getQuestion = async ({ difficulty, sample = 4 }) => (
  Word.aggregate(
    [
      { $match: { difficulty } }, { $sample: { size: sample } },
    ],
  )
);

const getFillInBlanksQuestion = async ({ difficulty, sample = 4 }) => (
  Word.aggregate(
    [
      { $match: { difficulty } }, {
        $redact: {
          $cond: [
            { $gt: [{ $strLenCP: '$word' }, 4] },
            '$$KEEP',
            '$$PRUNE',
          ],
        },
      }, { $sample: { size: sample } },
    ],
  )
);

const addReport = async ({ reportMessage, questionWordId, userId }) => (
  new Report({ reportMessage, questionWordId, userId }).save()
);

module.exports = {
  getQuestion,
  addReport,
  getFillInBlanksQuestion,
};
