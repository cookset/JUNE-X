require('dotenv').config();

module.exports = {
  SESSION_ID: process.env.SESSION_ID || '',
  PORT: process.env.PORT || 5000,
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL || '',
};