/* eslint-disable consistent-return */
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const responseHelper = require('../../plugins/response.plugin');
const memberService = require('../services/member.service');
const rabbitMq = require('../../plugins/rabbitmq.plugin');
const config = require('../../../config');

const login = async (req, res, next) => {
  try {
    const { email } = req.body;
    let { password } = req.body;

    if (password) {
      password = crypto.createHash('md5').update(req.body.password).digest('hex');
    }

    const member = await memberService.getMemberByEmailAndPassword({ email, password });

    if (!member) {
      return res.status(404).send(responseHelper.generateErrorResponse({ message: 'User not found. Authentication failed.', code: 404 }));
    }

    const token = jwt.sign({
      uuid: member._id,
      email: member.email,
    },
    config.jwt.key,
    {
      expiresIn: config.jwt.expires,
    });

    const user = {
      member: {
        _id: member._id,
        nameSurname: member.nameSurname,
        createdAt: member.createdAt,
        email: member.email,
      },
      token,
    };
    return res.status(200).send(responseHelper.generateSuccessResponse({ data: user }));
  }
  catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, nameSurname } = req.body;

    let { password } = req.body;

    if (password) {
      password = crypto.createHash('md5').update(password).digest('hex');
    }

    const member = await memberService.saveMember({
      email,
      password,
      nameSurname,
    });

    // Send mail user
    rabbitMq.sendRabbitMQ('mailChannel', JSON.stringify({
      email: 'testme-app@yandex.ru',
      nameSurname: 'Erdem Köşk',
      type: 'register',
      appName: 'Quiz It',
      welcomeTitle: 'Hoş Geldin!',
      // eslint-disable-next-line max-len
      welcomeMessage: 'Seni aramızda görmek çok güzel <b> nameSurname </b> ! <br/> İngilizce kelime öğrenmenin en kolay yolu 🤙. Boş zamanlarında senin için oluşturulan rastgele ingilizce kelime testlerini cevapla 🙏 Kendini geliştir!',
      mailIcon: 'https://img.icons8.com/clouds/100/000000/america.png',
      webSiteLink: 'https://quiz-it-app.github.io/',
      webSiteLinkButton: 'Hadi Başlayalım!',
      thanksText: 'Projemize destek verdiğin için teşekkür ederiz!',
      sincerelyText: 'Sevgilerle',
      needHelpText: 'Yardım mı lazım?',
      needHelpLink: 'http://erdemkosk.com',
    }));

    return res.status(200).send(responseHelper.generateSuccessResponse({ message: 'User created.', data: member }));
  }
  catch (error) {
    next(error);
  }
};

const getMember = async (req, res, next) => {
  try {
    const { _id } = req.query;

    const member = await memberService.getMember({ _id });

    if (!member) {
      return res.status(404).send(responseHelper.generateErrorResponse({ message: 'User not found. Authentication failed.', code: 404 }));
    }

    return res.status(200).send(responseHelper.generateSuccessResponse({ data: member }));
  }
  catch (error) {
    next(error);
  }
};

const updateMember = async (req, res, next) => {
  try {
    const { id } = req.query;
    const {
      email, nameSurname,
    } = req.body;
    let { password } = req.body;

    if (password) {
      password = crypto.createHash('md5').update(password).digest('hex');
    }
    const member = await memberService.updateMember({
      id,
      email,
      password,
      nameSurname,
    });

    if (!member) {
      return res.status(404).send(responseHelper.generateErrorResponse({ message: 'User can not find.', code: 404 }));
    }

    return res.status(200).send(responseHelper.generateSuccessResponse({ message: 'Member updated.', data: member }));
  }
  catch (error) {
    next(error);
  }
};

const updateStatistic = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      isRightAnswer, questionLevel,
    } = req.body;

    const member = await memberService.updateStatistic({
      id,
      isRightAnswer,
      questionLevel,
    });

    if (!member) {
      return res.status(404).send(responseHelper.generateErrorResponse({ message: 'User can not find.', code: 404 }));
    }

    return res.status(200).send(responseHelper.generateSuccessResponse({ message: 'Member statistic updated.', data: member }));
  }
  catch (error) {
    next(error);
  }
};

const getTopTenMembers = async (req, res, next) => {
  try {
    const members = await memberService.getTopTenMembers({});

    if (!members) {
      return res.status(404).send(responseHelper.generateErrorResponse({ message: 'Users can not find.', code: 404 }));
    }

    return res.status(200).send(responseHelper.generateSuccessResponse({ data: members }));
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
  updateStatistic,
  getTopTenMembers,
};
