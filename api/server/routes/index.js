/* eslint-disable func-names */
const bodyParser = require('body-parser');
const healthRoutes = require('./health');
const memberRoutes = require('./member');
const questionRoutes = require('./question');
const wordRoutes = require('./word');
const statisticRoutes = require('./statistic');

module.exports = function (app) {
  app.use(bodyParser.json({ limit: '10kb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api/health/', healthRoutes);
  app.use('/api/member/', memberRoutes);
  app.use('/api/question/', questionRoutes);
  app.use('/api/word/', wordRoutes);
  app.use('/api/statistic/', statisticRoutes);
};
