const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/heroku-webhook', (req, res) => {
  // Extract relevant data from Heroku webhook payload
  const herokuEventData = req.body;

  // Transform data to match Discord webhook payload structure
  const discordPayload = {
    content: `Heroku Event: ${herokuEventData.event}`,
    embeds: [
      {
        title: 'Heroku Notification',
        description: 'Details about the event...',
        fields: [
          { name: 'App Name', value: herokuEventData.app.name, inline: true },
          // Add more fields as needed
        ],
      },
    ],
  };

  // Send payload to Discord webhook
  axios.post(`${process.env.DISCORD_WEBHOOK}`, discordPayload)
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.error('Error sending Discord webhook:', error);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});