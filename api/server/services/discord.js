const discordPlugin = require('../../plugin/discord');
const config = require('../../../config');

const sendMessageToDiscord = async ({ messageType, message }) => {
  if (config.discord.enable) {
    discordPlugin.sendMessageToDiscord({ messageType, message });
  }

  return { success: true };
};

module.exports = {
  sendMessageToDiscord,
};
