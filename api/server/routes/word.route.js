const router = require('express').Router();
const multer = require('multer');
const wordController = require('../controllers/word.controller');
const { validate } = require('../../validators/index');
const { addWordValidationRules, updateWordValidationRules } = require('../../validators/word.validator');
const auth = require('../../middlewares/authentication.middleware');

const upload = multer({ storage: multer.memoryStorage() });


/**
 * Get a single word
 * @route GET /word/{id}
 * @group word - Operations about words
 * @param {string} id.path.required
 * @returns {object} 200 - return single word and translated
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', auth.checkToken, wordController.getWord);

/**
 * Get all words with pagination
 * @route GET /word/
 * @group word - Operations about words
 * @param {integer} page.query -  page
 * @param {integer} limit.query - limit
 * @returns {object} 200 - returning words with pagination
 * @returns {Error}  default - Unexpected error
 */
router.get('/', auth.checkToken, wordController.getWords);


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
router.post('/', auth.checkToken, addWordValidationRules(), validate, wordController.addWord);

/**
 * Create a words with upload csv file
 * @route POST /word/csv/:difficulty
 * @group word - Operations about words
 * @param {number} difficulty.path.required
 * @param {file} csv.path.required
 * @returns {object} 200 - return success message
 * @returns {Error}  default - Unexpected error
 */
router.post('/csv/', auth.checkToken, upload.single('file'), wordController.addWordsWithCsv);

/**
 * Update a single word
 * @route PUT /word/{id}
 * @group word - Operations about words
 * @param {string} id.path.required - eg: 5e2f2f5737144e099c26c14b
 * @param {Word.model} word.body.required
 * @returns {object} 200 - return single word
 * @returns {Error}  default - Unexpected error
 */
router.put('/:id', auth.checkToken, updateWordValidationRules(), validate, wordController.updateWord);

/**
 * Perma delete
 * @route DELETE /word/
 * @group word - Operations about words
 * @param {string} id.query.required -  eg: 5e32b50f1e67fa092bdbc389
 * @returns {object} 200 - returning words with pagination
 * @returns {Error}  default - Unexpected error
 */
router.delete('/', auth.checkToken, wordController.deleteWord);

module.exports = router;
