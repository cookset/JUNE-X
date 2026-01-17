const commandHandler = require('./commandHandler');
const logger = require('../utils/logger');

const messageHandler = async (conn, msg) => {
  try {
    if (!msg.message) return;
    
    const messageType = Object.keys(msg.message)[0];
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    
    let text = '';
    if (messageType === 'conversation') {
      text = msg.message.conversation;
    } else if (messageType === 'extendedTextMessage') {
      text = msg.message.extendedTextMessage.text;
    }

    if (!text) return;

    logger.info(`Message from ${from}: ${text}`);

    // Check if it's a command
    if (text.startsWith('/') || text.startsWith('.') || text.startsWith('!')) {
      await commandHandler(conn, msg, text);
    }
  } catch (error) {
    logger.error(`Error in messageHandler: ${error.message}`);
  }
};

module.exports = messageHandler;