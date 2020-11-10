/* eslint-disable max-len */
const dateFormat = require('dateformat');
const responseHelper = require('../../plugins/response.plugin');
const redisClient = require('../../plugins/redis.plugin').getClient();
const rabbitMq = require('../../plugins/rabbitmq.plugin');

const getHealthStatus = async (req, res) => {
  redisClient.hset('users', 'key', 'value');
  rabbitMq.sendRabbitMQ('mailChannel', JSON.stringify({
    email: 'testme-app@yandex.ru',
    nameSurname: 'Erdem Köşk',
    type: 'register',
    appName: 'Quiz It',
    welcomeTitle: 'Hoş Geldin!',
    welcomeMessage: 'Seni aramızda görmek çok güzel <b> nameSurname </b> ! <br/> İngilizce kelime öğrenmenin en kolay yolu 🤙. Boş zamanlarında senin için oluşturulan rastgele ingilizce kelime testlerini cevapla 🙏 Kendini geliştir!',
    mailIcon: 'https://img.icons8.com/clouds/100/000000/america.png',
    webSiteLink: 'https://quiz-it-app.github.io/',
    webSiteLinkButton: 'Hadi Başlayalım!',
    thanksText: 'Projemize destek verdiğin için teşekkür ederiz!',
    sincerelyText: 'Sevgilerle',
    needHelpText: 'Yardım mı lazım?',
    needHelpLink: 'http://erdemkosk.com',
  }));

  

  res.status(200).send(responseHelper.generateSuccessResponse(
    { data: { time: dateFormat(new Date(), 'dd-mm-yyyy h:MM:ss'), status: 'OK' } },
  ));
};

const getUptime = async (req, res) => res.status(200).send(responseHelper.generateSuccessResponse(
  { data: { time: `${Math.floor(Math.floor(process.uptime() * 1000) / 60000)} min.`, status: 'OK' } },
));

module.exports = {
  getHealthStatus,
  getUptime,
};
