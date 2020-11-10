const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../../middleware/authentication');

const {
  login,
  register,
  getMember,
  updateMember,
  getTopTenMembers,
  setMemberStatistic,
} = require('../controllers/member');
const schemas = require('../../validator/member');

/**
 * This function comment is parsed by doctrine
 * @route GET /member/
 * @group member - About member operations
 * @param {string} id.query.required 5ec28e2ae47cce0017b0b65d
 * @returns {object} 200 - returning Member from Members
 * @returns {Error}  default - Unexpected error
 */

router.get('/', auth.checkToken, celebrate(schemas.getmember), getMember);

/**
 * This function comment is parsed by doctrine
 * @route GET /member/top-ten
 * @group member - About member operations
 * @returns {object} 200 - An array of user from top-ten
 * @returns {Error}  default - Unexpected error
 */

router.get('/top-ten', getTopTenMembers);

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
 * @returns {object} 200 - Try to login system and get auth token
 * @returns {Error}  default - Unexpected error
 */

router.post('/login', celebrate(schemas.login), login);

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
 * @returns {object} 200 - Try to register system so create a uniq user
 * @returns {Error}  default - Unexpected error
 */

router.post('/register', celebrate(schemas.register), register);

/**
 * @typedef Register
 * @property {string} nameSurname.body.required - member name and surname - eg: name surname
 * @property {string} email.body.required - member email - eg: user@domain.com
 * @property {string} password.body.required - user's password - eg: pass
 */
/**
 * This function comment is parsed by doctrine
 * @route PUT /member/
 * @group member - About member operations
 * @param {Register.model} register.body.required
 * @param {string} id.query.required 1312312123
 * @returns {object} 200 - Update member using with id
 * @returns {Error}  default - Unexpected error
 */

router.put('/', celebrate(schemas.update), updateMember);

/**
 * @typedef Statistic
 * @property {boolean} isRightAnswer.body.required - member answer is right
 * @property {number} difficulty.body.required - question diffiuculty
 */
/**
 * This function comment is parsed by doctrine
 * @route PUT /member/update-statistic/{id}
 * @group member - About member operations
 * @param {string} id.path.required - eg: 5e2f2f5737144e099c26c14b
 * @param {Statistic.model} register.body.required
 * @returns {object} 200 - When member answers the question add member statistic
 * @returns {Error}  default - Unexpected error
 */

router.put('/update-statistic/:id', celebrate(schemas.setMemberStatistic), setMemberStatistic);


module.exports = router;
