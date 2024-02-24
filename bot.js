const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.BOT_TOKEN;

(() => {
  try {
    const bot = new TelegramBot(token, { polling: true });

    bot.on('polling_error', (error) => {
      console.error(`Telegram Bot polling ERROR: ${error.message}`);
      throw new Error(error.message);
    });
  } catch (error) {
    console.error(`Telegram Bot ERROR: ${error.message}`);
    throw new Error(error.message);
  }
})();
