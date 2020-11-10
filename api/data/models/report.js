/* eslint-disable max-len */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReportSchema = new Schema({
  questionWordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Word' },
  reportMessage: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: false },
},
{ versionKey: false });

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;
