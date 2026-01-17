const express = require('express');
const router = express.Router();

router.post('/whatsapp', (req, res) => {
  res.status(200).send('Webhook received');
});

module.exports = router;