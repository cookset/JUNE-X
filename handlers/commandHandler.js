const logger = require('../utils/logger');
const n8nService = require('../services/n8nService');

const commandHandler = async (conn, msg, text) => {
  const from = msg.key.remoteJid;
  const args = text.split(' ');
  const command = args[0].toLowerCase().slice(1);
  const query = args.slice(1).join(' ');

  logger.info(`Command received: ${command}`);

  switch (command) {
    case 'help':
      await conn.sendMessage(from, { 
        text: 'Available Commands:\n/help - Show this menu\n/order [item] - Place an order\n/price [item] - Check price\n/ping - Check bot status' 
      });
      break;

    case 'order':
      if (!query) {
        await conn.sendMessage(from, { text: 'Please specify what you want to order. Example: /order Pizza' });
        break;
      }
      await n8nService.sendToN8n({
        type: 'order',
        item: query,
        user: from,
        timestamp: new Date().toISOString()
      });
      await conn.sendMessage(from, { text: `Order for "${query}" has been received and is being processed!` });
      break;

    case 'price':
      if (!query) {
        await conn.sendMessage(from, { text: 'Please specify an item to check the price.' });
        break;
      }
      // You could integrate this with a database or service
      await conn.sendMessage(from, { text: `Checking price for "${query}"...` });
      break;

    case 'ping':
      await conn.sendMessage(from, { text: 'Pong! Bot is active.' });
      break;

    default:
      // Ignore unknown commands or send a generic response
      break;
  }
};

module.exports = commandHandler;