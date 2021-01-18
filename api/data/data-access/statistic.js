const Member = require('../models/member');
const Word = require('../models/word');

const getWordsStatistics = async () => (
  Word.count()
    .exec()
);

const getMembersStatistics = async () => (
  Member.count()
    .exec()
);

module.exports = {
  getWordsStatistics,
  getMembersStatistics,

};
