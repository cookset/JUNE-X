const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

const sendToN8n = async (data) => {
  if (!config.N8N_WEBHOOK_URL) {
    logger.warn('N8N_WEBHOOK_URL is not set in environment variables.');
    return;
  }

  try {
    const response = await axios.post(config.N8N_WEBHOOK_URL, data);
    logger.info(`Data sent to n8n: ${response.status}`);
    return response.data;
  } catch (error) {
    logger.error(`Error sending data to n8n: ${error.message}`);
    throw error;
  }
};

module.exports = { sendToN8n };