const { EmailEvent } = require('..');
const mailService = require('../../server/services/mail');

const EmailEventHandler = new EmailEvent();

EmailEventHandler.on('triger', (params) => {
  mailService.sendMessageToMailService({ member: params.member, mailType: params.mailType, token: params.token });
});

module.exports = {
  EmailEventHandler,
};
