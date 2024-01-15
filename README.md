# Heroku to Discord

## Features:
1. **Express.js Server Setup:**
   - Utilizes the Express.js framework to create a web server.
   - Listens on the specified port (`process.env.PORT` or defaulting to 3000).

2. **Heroku Webhook Handling:**
   - Provides a route (`/heroku-webhook`) to handle incoming Heroku webhook events.
   - Extracts relevant data from the Heroku webhook payload, including event data and metadata.
   - Formats a message based on the extracted data to provide a concise summary of the Heroku event.

3. **Discord Webhook Integration:**
   - Utilizes the Axios library to send a formatted payload to a Discord webhook.
   - The Discord payload includes an embed with information about the Heroku event.

4. **Environment Variable Usage:**
   - Uses `process.env` to read the `PORT` and `DISCORD_WEBHOOK` environment variables.
   - Provides default values for `PORT` (3000) and logs the `DISCORD_WEBHOOK` value.