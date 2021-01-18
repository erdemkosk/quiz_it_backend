const statisticDataAccess = require('../../data/data-access/statistic');

const getStatistic = async () => {
  const words = await statisticDataAccess.getWordsStatistics({});
  const members = await statisticDataAccess.getMembersStatistics({});

  return {
    words, members,
  };
};


module.exports = {
  getStatistic,
};
