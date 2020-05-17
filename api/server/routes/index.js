/* eslint-disable func-names */
const bodyParser = require('body-parser');

const healthRoutes = require('./health.route');
const memberRoutes = require('./member.route');
const wordRoutes = require('./word.route');
const questionRoutes = require('./question.route');

module.exports = function (app) {
  app.use(bodyParser.json({ limit: '10kb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api/health/', healthRoutes);
  app.use('/api/member/', memberRoutes);
  app.use('/api/word/', wordRoutes);
  app.use('/api/question/', questionRoutes);
};