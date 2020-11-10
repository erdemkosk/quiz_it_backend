const wordDataAccess = require('../../data/data-access/word');
const logger = require('../../plugin/logger');
const { NotFound } = require('../../util/error');
const { MESSAGES } = require('../../constant');

const getWords = async ({ page, limit, filter }) => {
  const words = await wordDataAccess.getWords({ page, limit, filter });
  const total = await wordDataAccess.getWordsCount({ filter });

  if (!words || !total) {
    logger.error('[WordService - getWords failed]%o', {
      page,
      limit,
      filter,
    });
    throw new NotFound(MESSAGES.WORD_NOT_FOUND);
  }

  return {
    words,
    total,
  };
};

const getWord = async ({ id }) => {
  const word = await wordDataAccess.getWord({ _id: id });

  if (!word) {
    logger.error('[WordService - getWord failed]%o', {
      id,
    });
    throw new NotFound(MESSAGES.WORD_NOT_FOUND);
  }

  return {
    word,
  };
};

const addWord = async ({ word, translated }) => {
  const createdWord = wordDataAccess.addWord({ word, translated });

  if (!createdWord) {
    logger.error('[WordService - createdWord failed]%o', {
      word,
      translated,
    });
    throw new NotFound(MESSAGES.WORD_CANNOT_CREATED);
  }

  return {
    createdWord,
  };
};

const updateWord = async ({
  id, word, translated, difficulty,
}) => {
  const updatedWord = await wordDataAccess.updateWord({
    id,
    word,
    translated,
    difficulty,
  });

  if (!updatedWord) {
    logger.error('[WordService - updateWord failed]%o', {
      id,
      word,
      translated,
      difficulty,
    });
    throw new NotFound(MESSAGES.WORD_CANNOT_UPDATED);
  }

  return {
    updatedWord,
  };
};

const deleteWord = async ({ id }) => {
  await wordDataAccess.deleteWord({ id });

  return {
    success: true,
  };
};

module.exports = {
  getWords,
  getWord,
  addWord,
  updateWord,
  deleteWord,
};
