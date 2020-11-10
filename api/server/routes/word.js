const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../../middleware/authentication');
const schemas = require('../../validator/word');

const {
  getWord,
  getWords,
  addWord,
  updateWord,
  deleteWord,
} = require('../controllers/word');

/**
 * Get a single word
 * @route GET /word/{id}
 * @group word - Operations about words
 * @param {string} id.path.required
 * @returns {object} 200 - return single word and translated
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', auth.checkToken, celebrate(schemas.getWord), getWord);

/**
 * Get all words with pagination
 * @route GET /word/
 * @group word - Operations about words
 * @param {integer} page.query -  page
 * @param {integer} limit.query - limit
 * @param {string} filter.query - filter
 * @returns {object} 200 - returning words with pagination
 * @returns {Error}  default - Unexpected error
 */
router.get('/', auth.checkToken, celebrate(schemas.getWords), getWords);


/**
 * @typedef Word
 * @property {string} word.body.required -  title - eg: title
 * @property {string} translated.body - translated(if empty translated from yandex) - eg: örnek
 */
/**
 * Create a word
 * @route POST /word/
 * @group word - Operations about words
 * @param {Word.model} word.body.required
 * @returns {object} 200 - return single word
 * @returns {Error}  default - Unexpected error
 */
router.post('/', auth.checkToken, celebrate(schemas.addWord), addWord);

/**
 * Update a single word
 * @route PUT /word/{id}
 * @group word - Operations about words
 * @param {string} id.path.required - eg: 5e2f2f5737144e099c26c14b
 * @param {Word.model} word.body.required
 * @returns {object} 200 - return single word
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', auth.checkToken, celebrate(schemas.updateWord), updateWord);

/**
 * Perma delete
 * @route DELETE /word/{id}
 * @group word - Operations about words
 * @param {string} id.path.required -  eg: 5e32b50f1e67fa092bdbc389
 * @returns {object} 200 - returning words with pagination
 * @returns {Error}  default - Unexpected error
 */
router.delete('/:id', auth.checkToken, celebrate(schemas.deleteWord), deleteWord);

module.exports = router;
