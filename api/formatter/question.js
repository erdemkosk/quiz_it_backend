module.exports = (question, answers, correctAnswer) => ({
  question: question ? question.word : undefined,
  wordId: question._id,
  answers,
  correctAnswer,
});
