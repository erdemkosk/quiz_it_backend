const router = require('express').Router();
const { getHealthStatus } = require('../controllers/health');

/**
 * This function comment is parsed by doctrine
 * @route GET /health/
 * @group health - Check server health
 * @returns {object} 200 - control server health status
 * @returns {Error}  default - Unexpected error
 */

router.get('/', getHealthStatus);

module.exports = router;
