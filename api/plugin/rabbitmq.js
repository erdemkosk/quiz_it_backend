const amqp = require('amqplib/callback_api');
const config = require('../../config');
const logger = require('../plugin/logger');


function sendRabbitMQ(queueName, data) {
  amqp.connect(config.rabbitmq.url, (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }

      const queue = queueName;

      channel.assertQueue(queue, {
        durable: false,
      });
      channel.sendToQueue(queue, Buffer.from(data));

      logger.info(' [x] Sent %s', data);
    });
    setTimeout(() => {
      connection.close();
    }, 500);
  });
}

module.exports = {
  sendRabbitMQ,
};
