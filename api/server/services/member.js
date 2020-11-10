const memberLogic = require('../../logic/member');
const memberDataAccess = require('../../data/data-access/member');
const logger = require('../../plugin/logger');
const { NotFound } = require('../../util/error');
const { MESSAGES } = require('../../constant');

const getMember = async ({ id }) => {
  const member = await memberDataAccess.getMember({ id });

  if (!member) {
    logger.error('[MemberService - getMember failed]%o', {
      id,
    });
    throw new NotFound(MESSAGES.MEMBER_NOT_FOUND);
  }

  return {
    member,
  };
};

const getMemberByEmailAndPassword = async ({ email, password }) => {
  const hashedPassword = memberLogic.hashPassword(password);
  const member = await memberDataAccess.getMemberByEmailAndPassword({ email, password: hashedPassword });

  if (!member) {
    logger.error('[MemberService - getMemberByEmailAndPassword failed]%o', {
      email,
    });
    throw new NotFound(MESSAGES.MEMBER_NOT_FOUND);
  }

  return {
    member,
  };
};

const createMember = async ({ email, password, nameSurname }) => {
  const hashedPassword = memberLogic.hashPassword(password);
  const member = await memberDataAccess.createMember({ email, password: hashedPassword, nameSurname });

  if (!member) {
    logger.error('[MemberService - createMember failed]%o', {
      email,
      nameSurname,
    });
    throw new NotFound(MESSAGES.MEMBER_CANNOT_CREATED);
  }

  return {
    member,
  };
};

const updateMember = async ({
  id, email, password, nameSurname,
}) => {
  const hashedPassword = memberLogic.hashPassword(password);
  const member = await memberDataAccess.updateMember({
    id, email, password: hashedPassword, nameSurname,
  });

  if (!member) {
    logger.error('[MemberService - updateMember failed]%o', {
      id,
      email,
      nameSurname,
    });
    throw new NotFound(MESSAGES.MEMBER_CANNOT_UPDATED);
  }

  return {
    member,
  };
};

const getTopTenMembers = async () => {
  const members = await memberDataAccess.getTopTenMembers();

  if (!members) {
    logger.error('[MemberService - getTopTenMembers failed]%o');
    throw new NotFound(MESSAGES.MEMBER_NOT_FOUND);
  }

  return {
    members,
  };
};

const setMemberStatistic = async ({ id, isRightAnswer, difficulty }) => {
  const { member } = await getMember({ id });

  if (!member) {
    logger.error('[MemberService - setMemberStatistic failed]%o', {
      id,
    });
    throw new NotFound(MESSAGES.MEMBER_NOT_FOUND);
  }
  const level = memberLogic.calculateLevel(member.level, (Number(member.currentExperience) + Number(difficulty)));
  const levelExperience = memberLogic.calculateLevelExperience(level);

  const currentExperience = level > member.level ? member.currentExperience + Number(difficulty) - member.levelExperience :
    member.currentExperience + Number(difficulty);

  if (isRightAnswer) {
    await memberDataAccess.setMemberSuccesfullQuestionStatistic({
      id, level, levelExperience, currentExperience,
    });
  }

  else {
    await memberDataAccess.setMemberWrongQuestionStatistic({
      id, level, levelExperience, currentExperience,
    });
  }

  return {
    success: true,
  };
};

module.exports = {
  getMember,
  getMemberByEmailAndPassword,
  createMember,
  updateMember,
  getTopTenMembers,
  setMemberStatistic,
};
