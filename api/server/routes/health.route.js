const router = require('express').Router();
const healthController = require('../controllers/health.controller');

/**
 * This function comment is parsed by doctrine
 * @route GET /health/
 * @group health - Check server health
 * @returns {object} 200 - server can answer
 * @returns {Error}  default - Unexpected error
 */

router.get('/', healthController.getHealthStatus);

/**
 * This function comment is parsed by doctrine
 * @route GET /health/uptime
 * @group health - Get server uptime
 * @returns {object} 200 - server can answer
 * @returns {Error}  default - Unexpected error
 */

router.get('/uptime', healthController.getUptime);


module.exports = router;
