module.exports = (question, answers, correctAnswer) => ({
  question: question?.word,
  wordId: question._id,
  answers,
  correctAnswer,
});
