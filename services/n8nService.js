const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

const sendToN8n = async (data) => {
  // Use the provided webhook URL directly if configured, otherwise fallback to config
  const webhookUrl = "https://tail9f7f31-automation.tail9f7f31.ts.net/webhook/whats";
  
  try {
    const response = await axios.post(webhookUrl, data);
    logger.info(`Data sent to n8n: ${response.status}`);
    return response.data;
  } catch (error) {
    logger.error(`Error sending data to n8n: ${error.message}`);
    // Don't throw to prevent bot from crashing on network errors
    return null;
  }
};

module.exports = { sendToN8n };