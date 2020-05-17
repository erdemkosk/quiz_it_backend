/* eslint-disable consistent-return */
const csv = require('csv-string');
const responseHelper = require('../../plugins/response.plugin');
const wordService = require('../services/word.service');
const wordLogic = require('../../logics/word.logic');

const getWords = async (req, res, next) => {
  const { filter } = req.query;

  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10,
  };

  try {
    const total = await wordService.getWordsCount({ filter });
    const words = await wordService.getWords({ pageOptions, filter });

    return res.status(200).send(responseHelper.generateSuccessResponse({
      data: {
        total,
        words,
      },
    }));
  }
  catch (error) {
    next(error);
  }
};

const getWord = async (req, res, next) => {
  const { id } = req.params;

  try {
    const word = await wordService.getWord({ _id: id });
    return res.status(200).send(responseHelper.generateSuccessResponse({ data: word }));
  }
  catch (error) {
    next(error);
  }
};

const addWord = async (req, res, next) => {
  const { word, translated } = req.body;

  try {
    const createdWord = await wordService.addWord({
      word,
      translated,

    });

    return res.status(200).send(responseHelper.generateSuccessResponse({ message: 'Word created.', data: createdWord }));
  }
  catch (error) {
    next(error);
  }
};

const addWordsWithCsv = async (req, res, next) => {
  try {
    const readedWords = [];
    const { difficulty } = req.query;

    csv.forEach(String(req.file.buffer), ',', (row) => {
      if (row[0] && row[1]) {
        readedWords.push({
          word: wordLogic.capitalizeFirstLetter(row[0]),
          translated: wordLogic.capitalizeFirstLetter(row[1]),
          difficulty,
        });
      }
    });

    wordService.addWordsWithCsv({ readedWords });

    return res.status(200).send(responseHelper.generateSuccessResponse({
      message: ` Readed csv and created ${readedWords.length} words. It could be a long time!`,
    }));
  }
  catch (error) {
    next(error);
  }
};

const updateWord = async (req, res, next) => {
  const { word, translated, difficulty } = req.body;
  const { id } = req.params;

  try {
    const findedWord = await wordService.updateWord({
      id,
      word,
      translated,
      difficulty,
    });

    return res.status(200).send(responseHelper.generateSuccessResponse({ message: 'Word updated.', data: findedWord }));
  }
  catch (error) {
    next(error);
  }
};

const deleteWord = async (req, res, next) => {
  const { id } = req.query;

  try {
    await wordService.deleteWord({ id });

    return res.status(200).send(responseHelper.generateSuccessResponse({ message: 'Word deleted permanently.' }));
  }
  catch (error) {
    next(error);
  }
};

module.exports = {
  getWords,
  getWord,
  addWord,
  addWordsWithCsv,
  updateWord,
  deleteWord,
};
