/* eslint-disable no-empty */
const memberLogic = require('../../logic/member');
const memberDataAccess = require('../../data/data-access/member');
const mailService = require('./mail');
const tokenService = require('./token');
const logger = require('../../plugin/logger');
const { MAIL_TYPE, FORGET_PASSWORD_JWT_EXPIRE } = require('../../constant');
const {
  MemberNotFound,
  MemberAlreadyCreated,
  MemberCannotCreated,
  MemberCannotUpdated,
  TokenIsNotValid,
} = require('../../util/error');

const getMember = async ({ id }) => {
  const member = await memberDataAccess.getMember({ id });

  if (!member) {
    logger.error('[MemberService - getMember failed]%o', {
      id,
    });
    throw new MemberNotFound();
  }

  const rank = await memberDataAccess.getMemberRanking({ level: member.level, currentExperience: member.currentExperience });

  return {
    member, rank,
  };
};

const getMemberWithEmail = async ({ email }) => {
  const member = await memberDataAccess.getMemberWithEmail({ email });

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
    throw new MemberNotFound();
  }

  return {
    member,
  };
};

const filterMember = async ({
  memberIds, isAdmin, levels, emails, nameSurnames, startDate, endDate,
}) => {
  const members = await memberDataAccess.filterMember({
    memberIds, isAdmin, levels, emails, nameSurnames, startDate, endDate,
  });

  return {
    members,
  };
};

const createMember = async ({ email, password, nameSurname }) => {
  const { member: alreadyRegisteredMember } = await getMemberWithEmail({ email });

  if (alreadyRegisteredMember) {
    throw new MemberAlreadyCreated();
  }

  const hashedPassword = memberLogic.hashPassword(password);
  const member = await memberDataAccess.createMember({ email, password: hashedPassword, nameSurname });

  if (!member) {
    logger.error('[MemberService - createMember failed]%o', {
      email,
      nameSurname,
    });
    throw new MemberCannotCreated();
  }

  await mailService.sendMessageToMailService({ member, mailType: MAIL_TYPE.REGISTER });

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
    throw new MemberCannotUpdated();
  }

  return {
    member,
  };
};

const getTopTenMembers = async () => {
  const members = await memberDataAccess.getTopTenMembers();

  if (!members) {
    logger.error('[MemberService - getTopTenMembers failed]%o');
    throw new MemberNotFound();
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
    throw new MemberNotFound();
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

const forgetPassword = async ({ email }) => {
  const { member } = await getMemberWithEmail({ email });

  if (!member) {
    logger.error('[MemberService - forgetPassword failed]%o', {
      email,
    });
    throw new MemberNotFound();
  }

  const token = await tokenService.generateToken({ uuid: member._id, email: member.email, expiresIn: FORGET_PASSWORD_JWT_EXPIRE });
  await mailService.sendMessageToMailService({ member, mailType: MAIL_TYPE.FORGET_PASSWORD, token });

  return {
    success: true,
  };
};

const changePassword = async ({ token, password }) => {
  let decodedToken;
  let uuid;

  try {
    decodedToken = await tokenService.decodeToken({ token });
    ({ uuid } = decodedToken);
  }
  catch (error) {
    logger.error('[MemberService - changePassword failed]%o', {
    });
    throw new TokenIsNotValid();
  }

  const { member } = await getMember({ id: uuid });

  if (!member) {
    logger.error('[MemberService - changePassword failed]%o', {
    });
    throw new MemberNotFound();
  }

  const { member: updatedMember } = await updateMember({
    id: member._id, email: member.email, password, nameSurname: member.nameSurname,
  });

  if (!updatedMember) {
    logger.error('[MemberService - changePassword failed]%o', {
    });
    throw new MemberCannotUpdated();
  }

  return {
    success: true,
  };
};

const setNotificationId = async ({ id, notificationId }) => {
  const { member } = await getMember({ id });

  if (!member) {
    logger.error('[MemberService - setNotificationId failed]%o', {
    });
    throw new MemberNotFound();
  }

  await memberDataAccess.setNotificationId({
    id, notificationId,
  });

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
  forgetPassword,
  changePassword,
  setNotificationId,
  filterMember,
};
