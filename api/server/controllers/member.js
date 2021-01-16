/* eslint-disable consistent-return */
const { successResponse, errorResponse } = require('../../util/response');
const { MESSAGES } = require('../../constant');

const memberService = require('../services/member');
const tokenService = require('../services/token');
const formatter = require('../../formatter/member');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { member } = await memberService.getMemberByEmailAndPassword({ email, password });

    const token = await tokenService.generateToken({ uuid: member._id, email: member.email });

    return res.status(200).send(successResponse({ results: formatter({ member, token }) }));
  }
  catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { nameSurname, email, password } = req.body;

    const { member } = await memberService.createMember({
      email,
      password,
      nameSurname,
    });

    return res.status(200).send(successResponse({ results: formatter(member) }));
  }
  catch (error) {
    next(error);
  }
};

const getMember = async (req, res, next) => {
  try {
    const { id } = req.query;

    const { member, rank } = await memberService.getMember({ id });

    return res.status(200).send(successResponse({ results: formatter({ member, rank }) }));
  }
  catch (error) {
    next(error);
  }
};

const updateMember = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { email, nameSurname, password } = req.body;

    const { member } = await memberService.updateMember({
      id,
      email,
      password,
      nameSurname,
    });

    return res.status(200).send(successResponse({ results: formatter({ member }) }));
  }
  catch (error) {
    next(error);
  }
};

const setMemberStatistic = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { isRightAnswer, difficulty } = req.body;

    const { success } = await memberService.setMemberStatistic({
      id,
      isRightAnswer,
      difficulty,
    });

    if (!success) {
      return res.status(404).send(errorResponse(MESSAGES.MEMBER_NOT_FOUND, 404));
    }

    return res.status(200).send(successResponse({ results: success }));
  }
  catch (error) {
    next(error);
  }
};

const getTopTenMembers = async (req, res, next) => {
  try {
    const { members } = await memberService.getTopTenMembers();

    return res.status(200).send(successResponse({ results: members.map(member => formatter(member)) }));
  }
  catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { success } = await memberService.forgetPassword({ email });

    return res.status(200).send(successResponse({ results: success }));
  }
  catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const { success } = await memberService.changePassword({ token, password });

    return res.status(200).send(successResponse({ results: success }));
  }
  catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
  getMember,
  updateMember,
  setMemberStatistic,
  getTopTenMembers,
  forgetPassword,
  changePassword,
};
