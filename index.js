const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
const webhook = process.env.DISCORD_WEBHOOK;

console.log(webhook)

app.use(bodyParser.json());

app.post('/heroku-webhook', (req, res) => {
  // Extract relevant data from Heroku webhook payload
  const herokuEventData = req.body.data;
  const herokuEventMetada = req.body.webhook_metadata;


  const message = `Event ID => ${herokuEventMetada.event.id}\nEvent Type => ${herokuEventMetada.event.include}\nTriggered by => ${herokuEventData.user.email}\nStatus => ${herokuEventData.status}`


  // Transform data to match Discord webhook payload structure
  const discordPayload = {
    embeds: [
      {
        title: 'Heroku Notification',
        description: message,
        fields: [
          { name: 'App Name', value: herokuEventData.app.name, inline: true },
          // Add more fields as needed
        ],
      },
    ],
  };

  // Send payload to Discord webhook
  axios.post(`${webhook}`, discordPayload)
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.error('Error sending Discord webhook:', error);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});