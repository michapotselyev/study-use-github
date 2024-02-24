const menuReplyMarkups = require("../utils/replyMarkups/menuReplyMarkups");

class MessageController {
  async introduction(bot, chatId) {
    await bot.sendMessage(chatId, 'Welcome to the best Telegram Shop!');
    return;
  }

  async menu(bot, chatId) {
    await bot.sendMessage(chatId, 'Choose category that you want to see!', { reply_markup: menuReplyMarkups });
    return;
  }

  async default(bot, chatId) {
    await bot.sendMessage(chatId, 'Sorry, I don\'t undestand you (\nPlease use commands or buttons.');
    return;
  }
}

module.exports = new MessageController();
