const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Replace with your Discord webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1303905695208570890/hqxllBpBroaolym0eh6KgVZE0vBlDu4Ng-yh9F1Tc4fhtlXm9J_odrDJWI6WMF3-2qr4';

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.post('/api/log', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userInput = req.body.input;

  const logData = {
    content: `**New Submission**\n- **IP:** ${ip}\n- **Input:** ${userInput}`,
  };

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData),
    });
    res.send('Submission logged and sent to Discord.');
  } catch (error) {
    console.error('Error sending to Discord:', error);
    res.status(500).send('Failed to log submission.');
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
