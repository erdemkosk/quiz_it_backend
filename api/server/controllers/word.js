/* eslint-disable consistent-return */
const { successResponse } = require('../../util/response');
const wordService = require('../services/word');
const formatter = require('../../formatter/word');

const getWords = async (req, res, next) => {
  const { page, limit, filter } = req.query;

  try {
    const { total, words } = await wordService.getWords({ page, limit, filter });

    return res.status(200).send(successResponse({ results: formatter.formatWords(total, words) }));
  }
  catch (error) {
    next(error);
  }
};

const getWord = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { word } = await wordService.getWord({ id });

    return res.status(200).send(successResponse({ results: formatter.formatWord(word) }));
  }
  catch (error) {
    next(error);
  }
};

const addWord = async (req, res, next) => {
  const { word, translated } = req.body;

  try {
    const { createdWord } = await wordService.addWord({
      word,
      translated,

    });

    return res.status(200).send(successResponse({ results: formatter.formatWord(createdWord) }));
  }
  catch (error) {
    next(error);
  }
};

const updateWord = async (req, res, next) => {
  const { word, translated, difficulty } = req.body;
  const { id } = req.params;

  try {
    const { updatedWord } = await wordService.updateWord({
      id,
      word,
      translated,
      difficulty,
    });

    return res.status(200).send(successResponse({ results: formatter.formatWord(updatedWord) }));
  }
  catch (error) {
    next(error);
  }
};

const deleteWord = async (req, res, next) => {
  const { id } = req.params;

  try {
    await wordService.deleteWord({ id });

    return res.status(200).send(successResponse({ message: 'Word deleted permanently.' }));
  }
  catch (error) {
    next(error);
  }
};

module.exports = {
  getWords,
  getWord,
  addWord,
  updateWord,
  deleteWord,
};
