const { successResponse } = require('../../util/response');
const statisticService = require('../services/statistic');
const formatter = require('../../formatter/statistic');

const getStatistic = async (req, res, next) => {
  try {
    const { words, members } = await statisticService.getStatistic({ });

    return res.status(200).send(successResponse({ results: formatter({ words, members }) }));
  }
  catch (error) {
    next(error);
  }
};

module.exports = {
  getStatistic,
};
