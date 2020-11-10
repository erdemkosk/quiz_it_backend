const mongoose = require('mongoose');
const Member = require('../../data/models/member');
const memberLogic = require('../../logics/member.logic');
const { InvalidIDError } = require('../../errors/types');

const getMember = async ({ _id }) => {
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    throw new InvalidIDError();
  }

  return (
    Member
      .findById(mongoose.Types.ObjectId(_id))
      .lean()
      .exec()
  );
};

const getMemberByEmailAndPassword = async ({ email, password }) => (
  Member
    .findOne({ email, password })
    .lean()
    .exec()
);

const saveMember = async ({ email, password, nameSurname }) => (
  new Member({
    email, password, nameSurname,
  }).save()
);

const updateMember = async ({
  id, email, password, nameSurname,
}) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new InvalidIDError();
  }

  return (
    Member.findOneAndUpdate({ _id: id }, {
      $set: {
        email,
        password,
        nameSurname,
      },
    }, { new: true })
  );
};

const getTopTenMembers = async () => (
  Member.find({}, { admin: 0, password: 0 })
    .sort({ level: -1, currentExperience: -1 })
    .limit(10)
    .exec()
);

const updateStatistic = async ({
  id, isRightAnswer, questionLevel,
}) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new InvalidIDError();
  }

  let member = await Member.findById(mongoose.Types.ObjectId(id)).lean().exec();

  const newLevel = memberLogic.calculateLevel(member.level, (Number(member.currentExperience) + Number(questionLevel)));
  const newlevelExperience = memberLogic.calculateLevelExperience(newLevel);
  const newcurrentExperience = newLevel > member.level ? member.currentExperience + Number(questionLevel) - member.levelExperience
    : member.currentExperience + Number(questionLevel);

  if (isRightAnswer === true) {
    member = Member.findOneAndUpdate({ _id: id },
      {
        $set: {
          level: newLevel,
          levelExperience: newlevelExperience,
          currentExperience: newcurrentExperience,
        },
        $inc: {
          'statistic.totalQuestion': 1, 'statistic.totalRightAnswers': 1,
        },
      }, { new: true });
  }

  else {
    member = Member.findOneAndUpdate({ _id: id },
      {
        $inc: {
          'statistic.totalQuestion': 1, 'statistic.totalWrongAnswers': 1,
        },
      }, { new: true });
  }

  return member;
};

module.exports = {
  getMember,
  getMemberByEmailAndPassword,
  saveMember,
  updateMember,
  updateStatistic,
  getTopTenMembers,
};
