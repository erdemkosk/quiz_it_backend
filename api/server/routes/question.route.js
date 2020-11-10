
const router = require('express').Router();
const questionController = require('../controllers/question.controller');
const auth = require('../../middlewares/authentication.middleware');

/**
 * This function comment is parsed by doctrine
 * @route GET /question/
 * @group question - About question operations
 * @param {string} difficulty.query.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

router.get('/', questionController.getQuestion);

/**
 * @typedef Report
 * @property {string} reportMessage.body.required - user's password - eg: Soru Hatalı!
 * @property {string} questionWordId.body.required -  email - eg: 5ea4224533b9db0079cefe6b
 * @property {string} userId.body.required -  user id - eg: 5ea4224533b9db0079cefe6b
 */
/**
 * This function comment is parsed by doctrine
 * @route POST /question/report
 * @group question - About question operations
 * @param {Report.model} report.body.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

router.post('/report', auth.checkToken, questionController.addReport);


module.exports = router;
