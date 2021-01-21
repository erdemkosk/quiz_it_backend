/* eslint-disable max-len */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const MemberSchema = new Schema({
  nameSurname: {
    type: String,
    required: [true, '`{PATH}` alanı zorunludur.'],
    maxlength: [60, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır '],
    minlength: [3, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.'],
  },
  email: {
    type: String,
    required: [true, '`{PATH}` alanı zorunludur.'],
    unique: [true, 'Böyle bir kullanıcı adı mevcuttur.'],
    maxlength: [60, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır '],
    minlength: [3, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.'],
  },
  password: {
    type: String,
    required: [true, '`{PATH}` alanı zorunludur.'],
    minlength: [3, '`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.'],
  },
  notifications: {
    type: Array,
  },
  createdAt: { type: Date, default: Date.now() },
  admin: { type: Boolean, default: false },
  level: {
    type: Number,
    default: 1,
  },
  levelExperience: {
    type: Number,
    default: 0,
  },
  currentExperience: {
    type: Number,
    default: 0,
  },
  statistic: {
    totalQuestion: {
      type: Number,
      default: 0,
    },
    totalRightAnswers: {
      type: Number,
      default: 0,
    },
    totalWrongAnswers: {
      type: Number,
      default: 0,
    },
  },

},
{ versionKey: false });

const Member = mongoose.model('Member', MemberSchema);
module.exports = Member;
