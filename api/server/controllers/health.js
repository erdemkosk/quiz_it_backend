const dateFormat = require('dateformat');
const { successResponse } = require('../../util/response');

const getHealthStatus = async (req, res) => res.status(200).send(successResponse({
  results: {
    time: dateFormat(new Date(), 'dd-mm-yyyy h:MM:ss'),
    uptime: `${Math.floor(Math.floor(process.uptime() * 1000) / 60000)} min.`,
  },
}));

module.exports = {
  getHealthStatus,
};
