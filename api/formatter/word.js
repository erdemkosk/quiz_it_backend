const formatWord = word => ({
  ...word,
  word: word.word.trim(),
  translated: word.translated.trim(),
});

const formatWords = (total, words) => ({
  total,
  words: words.map(word => formatWord(word)),
});

module.exports = {
  formatWord,
  formatWords,
};
