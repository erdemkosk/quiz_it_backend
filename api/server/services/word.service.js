/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const yandexService = require('../services/yandex.service');
const Word = require('../../data/models/word');
const { InvalidIDError } = require('../../errors/types');


const addWord = async ({ word, translated }) => {
  if (!translated) {
    // eslint-disable-next-line no-param-reassign
    translated = await yandexService.getTranslatedWordFromYandex({ word });
  }
  word = word.charAt(0).toUpperCase() + word.slice(1);
  translated = translated.charAt(0).toUpperCase() + translated.slice(1);

  return (
    Word.findOneAndUpdate({ word }, { $set: { translated, createdAt: Date.now(), updateAt: Date.now() } }, { upsert: true, new: true })
  );
};

const addWordsWithCsv = async ({ readedWords }) => {
  const words = [];

  for (let index = 0; index < readedWords.length; index += 1) {
    try {
      await new Word({ word: readedWords[index].word, translated: readedWords[index].translated, difficulty: readedWords[index].difficulty }).save();
    }
    // eslint-disable-next-line no-empty
    catch (error) {
      // console.log(error);
    }
  }
  return (
    words
  );
};

const getWord = async ({ _id }) => {
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    throw new InvalidIDError();
  }

  return (
    Word.findById({ _id })
      .exec()
  );
};

const getWords = async ({ pageOptions, filter }) => {
  if (!filter) {
    filter = '';
  }
  return (
    Word.find({ word: { $regex: `^${filter}`, $options: 'i' } })
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .sort({ word: 'asc' })
      .exec()
  );
};

const getWordsCount = async ({ filter }) => {
  if (!filter) {
    filter = '';
  }
  return (
    Word.countDocuments({ word: { $regex: `.*${filter}.*`, $options: 'i' } })
      .exec()
  );
};

const updateWord = async ({
  id, word, translated, difficulty,
}) => (
  Word.findByIdAndUpdate(id, {
    $set: {
      word,
      translated,
      difficulty,
      updateAt: Date.now(),
    },
  }, { new: true })
);

const deleteWord = async ({ id }) => {
  if (!mongoose.Types.ObjectId.isValid(mongoose.Types.ObjectId(id))) {
    throw new InvalidIDError();
  }

  return (
    Word.findByIdAndRemove({ _id: mongoose.Types.ObjectId(id) })
      .exec()
  );
};

module.exports = {
  addWord,
  addWordsWithCsv,
  getWord,
  getWords,
  getWordsCount,
  updateWord,
  deleteWord,
};
