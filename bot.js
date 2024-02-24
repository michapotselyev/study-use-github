const TelegramBot = require('node-telegram-bot-api');
const message = require('./src/routers/message');
const callback = require('./src/routers/callback');
require('dotenv').config();

const token = process.env.BOT_TOKEN;

(() => {
  try {
    const bot = new TelegramBot(token, { polling: true });

    bot.on('message', async (msg) => await message(bot, msg));

    bot.on("callback_query", async (data) => await callback(bot, data));

    bot.on('polling_error', (error) => {
      console.error(`Telegram Bot polling ERROR: ${error.message}`);
      throw new Error(error.message);
    });
  } catch (error) {
    console.error(`Telegram Bot ERROR: ${error.message}`);
    throw new Error(error.message);
  }
})();
