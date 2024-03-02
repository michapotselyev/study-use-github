const sharedDatabase = require("../database");
const errorHandler = require("../handlers/errorHandler");
const catalogReplyMarkups = require("../utils/replyMarkups/catalogReplyMarkups");
const menuReplyMarkups = require("../utils/replyMarkups/menuReplyMarkups");

class MessageService {
  async addNewUser(bot, chatId, user) {
    try {
      const full_name = user.first_name +
        (user.last_name && user.last_name !== '' ? " " + user.last_name : "");

      await sharedDatabase.insert('users', { chatId, username: user.username, full_name });
    } catch (error) {
      await errorHandler.databaseError(bot, chatId, error);
    }
  }

  async findUser(bot, chatId) {
    try {
      const user = (await sharedDatabase.select('users', '*', `WHERE chatId=${chatId}`))[0];
      return user;
    } catch (error) {
      await errorHandler.databaseError(bot, chatId, error);
    }
  }

  async introduction(bot, chatId, user) {
    const userFromDB = await this.findUser(bot, chatId);

    if (!userFromDB) {
      await this.addNewUser(bot, chatId, user);
      await bot.sendMessage(chatId, 'Welcome to the best Telegram Shop!');
      return;
    }

    await this.menu(bot, chatId);
  }

  async menu(bot, chatId) {
    const user = await this.findUser(bot, chatId);

    await bot.sendMessage(chatId,
      `*Welcome to menu!*\n\n🆔 *${user.chatId}*\n👤 *${user.full_name}*\nℹ️ *${user.username}*`,
      {
        reply_markup: menuReplyMarkups,
        parse_mode: 'Markdown'
      }
    );
  }

  async catalog(bot, chatId) {
    await bot.sendMessage(chatId, 'Choose category that you want to see!', { reply_markup: catalogReplyMarkups });
  }

  async default(bot, chatId) {
    await bot.sendMessage(chatId, 'Sorry, I don\'t undestand you (\nPlease use commands or buttons.');
  }
}

module.exports = new MessageService();
