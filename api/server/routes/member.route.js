const router = require('express').Router();
const { validate } = require('../../validators/index');
const { loginValidationRules, registerValidationRules, getMemberValidationRules } = require('../../validators/member.validator');
const memberController = require('../controllers/member.controller');
const auth = require('../../middlewares/authentication.middleware');


/**
 * @typedef Login
 * @property {string} email.body.required -  email - eg: user@domain.com
 * @property {string} password.body.required - user's password - eg: pass
 */
/**
 * This function comment is parsed by doctrine
 * @route POST /member/login
 * @group member - About member operations
 * @param {Login.model} login.body.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

router.post('/login', loginValidationRules(), validate, memberController.login);

/**
 * @typedef Register
 * @property {string} nameSurname.body.required - member name and surname - eg: name surname
 * @property {string} email.body.required - member email - eg: user@domain.com
 * @property {string} password.body.required - user's password - eg: pass
 */
/**
 * This function comment is parsed by doctrine
 * @route POST /member/register
 * @group member - About member operations
 * @param {Register.model} register.body.required
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

router.post('/register', registerValidationRules(), validate, memberController.register);
/**
 * This function comment is parsed by doctrine
 * @route GET /member/
 * @group member - About member operations
 * @param {string} _id.query.required 1312312123
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

router.get('/', auth.checkToken, getMemberValidationRules(), validate, memberController.getMember);

router.put('/updateStatistic/:id', auth.checkToken, memberController.updateStatistic);

router.get('/top-ten', memberController.getTopTenMembers);

router.put('/', auth.checkToken, memberController.updateMember);

module.exports = router;
