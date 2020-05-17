const mongoose = require('mongoose');

const { Schema } = mongoose;

const WordSchema = new Schema({
  word: {
    type: String,
    required: [true, '`{PATH}` alanı zorunludur.'],
    unique: [true, 'Böyle bir blog adı mevcuttur.'],
  },
  translated: { type: String, required: true },
  difficulty: {
    type: Number, required: true, min: 1, max: 6,
  },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
});

const Word = mongoose.model('Word', WordSchema);
module.exports = Word;
