const mongoose = require('mongoose');
const Member = require('../models/member');
const { convertProductIdsToObjectIds } = require('../../logic/member');

const getMember = async ({ id }) => (
  Member
    .findById(mongoose.Types.ObjectId(id))
    .lean()
    .exec()
);

const getMemberWithEmail = async ({ email }) => (
  Member
    .findOne({ email })
    .lean()
    .exec()
);

const getMemberByEmailAndPassword = async ({ email, password }) => (
  Member
    .findOne({ email, password })
    .lean()
    .exec()
);

const getMemberRanking = async ({ level, currentExperience }) => (
  Member
    .find({
      $or: [
        { level: { $gt: level } },
        { level, currentExperience: { $gt: currentExperience } },
      ],
    })
    .count()
    .lean()
    .exec()
);

const createMember = async ({ email, password, nameSurname }) => (
  new Member({
    email, password, nameSurname,
  }).save({
    lean: true,
  })
);

const updateMember = async ({
  id, email, password, nameSurname,
}) => (
  Member.findOneAndUpdate({ _id: id }, {
    $set: {
      email,
      password,
      nameSurname,
    },
  }, { new: true })
);

const getTopTenMembers = async () => (
  Member.find({}, { admin: 0, password: 0 })
    .sort({ level: -1, currentExperience: -1 })
    .limit(10)
    .lean()
    .exec()
);

const filterMember = async ({
  memberIds, isAdmin, levels, emails, nameSurnames, startDate, endDate,
}) => Member.aggregate([
  {
    $match: {
      ...(isAdmin !== undefined ? {
        admin: isAdmin,
      } : undefined),
      ...(emails !== undefined ? {
        email: { $in: emails },
      } : undefined),
      ...(nameSurnames !== undefined ? {
        nameSurname: { $in: nameSurnames },
      } : undefined),
      ...(memberIds !== undefined ? {
        _id: { $in: convertProductIdsToObjectIds(memberIds) },
      } : undefined),
      ...(levels !== undefined ? {
        level: { $in: levels },
      } : undefined),
      ...(startDate ? {
        lastPlayedDate: { $gte: new Date(startDate) },
      } : undefined),
      ...(endDate ? {
        lastPlayedDate: { $lte: new Date(endDate) },
      } : undefined),
    },
  },
  {
    $project: {
      notifications: '$notifications',
      nameSurname: '$nameSurname',
    },
  },
]);

const setMemberSuccesfullQuestionStatistic = async ({
  id, level, levelExperience, currentExperience,
}) => Member.findOneAndUpdate({ _id: id },
  {
    $set: {
      level,
      levelExperience,
      currentExperience,
      lastPlayedDate: new Date(),
    },
    $inc: {
      'statistic.totalQuestion': 1, 'statistic.totalRightAnswers': 1,
    },
  }, { new: true });

const setMemberWrongQuestionStatistic = async ({ id }) => Member.findOneAndUpdate({ _id: id },
  {
    $set: {
      lastPlayedDate: new Date(),
    },
    $inc: {
      'statistic.totalQuestion': 1, 'statistic.totalWrongAnswers': 1,
    },
  }, { new: true });

const setNotificationId = async ({
  id, notificationId,
}) => Member.findOneAndUpdate({ _id: id },
  {
    $addToSet: { notifications: notificationId },
  }, { new: true });

module.exports = {
  getMember,
  getMemberByEmailAndPassword,
  createMember,
  updateMember,
  getTopTenMembers,
  setMemberSuccesfullQuestionStatistic,
  setMemberWrongQuestionStatistic,
  getMemberWithEmail,
  getMemberRanking,
  setNotificationId,
  filterMember,
};
