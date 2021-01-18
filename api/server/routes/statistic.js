const router = require('express').Router();
const { getStatistic } = require('../controllers/statistic');
const auth = require('../../middleware/authentication');

/**
 * This function comment is parsed by doctrine
 * @route GET /statistic/
 * @group statistic - Get statistic of app
 * @returns {object} 200 - control server health status
 * @returns {Error}  default - Unexpected error
 */

router.get('/', auth.checkToken, getStatistic);

module.exports = router;
