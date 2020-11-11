const rabbitMqPlugin = require('../../plugin/rabbitmq');
const serviceCaller = require('../../util/service-caller');
const { MAIL_TYPE } = require('../../constant');
const config = require('../../../config');

const sendMessageToMailService = async ({ member, mailType, token }) => {
  if (!config.rabbitmq.enable) {
    return { success: false };
  }

  try {
    await serviceCaller.request('https://rabbitmq-mail-consumer-server.herokuapp.com/health');
  }
  catch (error) {
    return { success: false };
  }

  switch (mailType) {
  case MAIL_TYPE.REGISTER:
    rabbitMqPlugin.sendRabbitMQ('mailChannel', JSON.stringify({
      email: member.email,
      nameSurname: member.nameSurname,
      type: 'register',
      appName: 'Quiz It',
      welcomeTitle: 'Hoş Geldin!',
      // eslint-disable-next-line max-len
      welcomeMessage: 'Seni aramızda görmek çok güzel <b> nameSurname </b> ! <br/> İngilizce kelime öğrenmenin en kolay yolu 🤙. Boş zamanlarında senin için oluşturulan rastgele ingilizce kelime testlerini cevapla Kendini geliştir!',
      mailIcon: 'https://img.icons8.com/clouds/100/000000/america.png',
      webSiteLink: 'https://qi-it.github.io/#/',
      webSiteLinkButton: 'Hadi Başlayalım!',
      thanksText: 'Projemize destek verdiğin için teşekkür ederiz!',
      sincerelyText: 'Sevgilerle',
      needHelpText: 'Yardım mı lazım?',
      needHelpLink: 'http://erdemkosk.com',
    }));

    break;

  case MAIL_TYPE.FORGET_PASSWORD:
    rabbitMqPlugin.sendRabbitMQ('mailChannel', JSON.stringify({
      email: member.email,
      nameSurname: member.nameSurname,
      type: 'forget',
      appName: 'Quiz It',
      forgetTitle: 'Şifreni Unutmuşsun :(',
      forgetMessage: '<b>nameSurname</b> şifreni unutmuşsun! Lütfen aşağıdaki linke giderek şifrenizi sıfırlayın...',
      mailIcon: 'https://img.icons8.com/clouds/100/000000/jake.png',
      webSiteLink: `https://qi-it.github.io/#/token/${token}`,
      webSiteLinkButton: 'Şifreni Sıfırla!',
      warningText: 'Şifre sıfırlama talebini siz yollamadıysanız, lütfen dikkate almayın !',
      sincerelyText: 'Sevgilerle',
      needHelpText: 'Yardım mı lazım?',
      needHelpLink: 'http://erdemkosk.com',
    }));
    break;

  default:
    return { success: false };
  }

  return { success: true };
};

module.exports = {
  sendMessageToMailService,
};
