const messageService = require("../services/message");
const errorHandler = require("../handlers/errorHandler");

class MessageController {
  async introduction(bot, chatId, user) {
    try {
      await messageService.introduction(bot, chatId, user);
    } catch (error) {
      await errorHandler.botError(bot, chatId, error);
    }
  }

  async menu(bot, chatId) {
    try {
      await messageService.menu(bot, chatId);
    } catch (error) {
      await errorHandler.botError(bot, chatId, error);
    }
  }

  async default(bot, chatId) {
    try {
      await messageService.default(bot, chatId);
    } catch (error) {
      await errorHandler.botError(bot, chatId, error);
    }
  }
}

module.exports = new MessageController();
