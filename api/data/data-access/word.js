const mongoose = require('mongoose');
const Word = require('../../data/models/word');

const addWord = async ({ word, translated }) => (
  Word.findOneAndUpdate({ word },
    { $set: { translated, createdAt: Date.now(), updateAt: Date.now() } },
    { upsert: true, new: true })
    .lean()
    .exec()
);

const getWord = async ({ _id }) => (
  Word.findById({ _id })
    .lean()
    .exec()
);

const getWords = async ({ page = 0, limit = 20, filter = '' }) => (
  Word.find({ word: { $regex: `^${filter}`, $options: 'i' } })
    .skip(page * limit)
    .limit(limit)
    .sort({ word: 'asc' })
    .lean()
    .exec()
);

const getWordsCount = async ({ filter = '' }) => (
  Word.countDocuments({ word: { $regex: `^${filter}`, $options: 'i' } })
    .lean()
    .exec()
);

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
    .lean()
    .exec()
);

const deleteWord = async ({ id }) => (
  Word.findByIdAndRemove({ _id: mongoose.Types.ObjectId(id) })
    .lean()
    .exec()
);

module.exports = {
  addWord,
  getWord,
  getWords,
  getWordsCount,
  updateWord,
  deleteWord,
};
