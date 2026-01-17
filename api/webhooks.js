const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

// This endpoint could be called by n8n to send messages via the bot
router.post('/send-message', async (req, res) => {
  const { jid, message, apiKey } = req.body;

  // Simple API Key validation if needed
  // if (apiKey !== process.env.API_KEY) return res.status(401).send('Unauthorized');

  if (!jid || !message) {
    return res.status(400).json({ error: 'Missing jid or message' });
  }

  try {
    // Note: 'conn' would need to be accessible here, usually via a global or event emitter
    // For now, we log the intent
    logger.info(`n8n requested to send message to ${jid}: ${message}`);
    
    // In a real scenario, you'd use an event emitter to tell the main bot to send:
    // botEvents.emit('send', { jid, message });

    res.status(200).json({ status: 'success', message: 'Message request queued' });
  } catch (error) {
    logger.error(`Webhook error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;