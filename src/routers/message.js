const messageController = require("../controllers/messageController");

async function message(bot, msg) {
  const chatId = msg.chat.id;

  switch (msg.text) {
    case '/start':
      await messageController.introduction(bot, chatId, msg.from);
      return;

    case '/menu':
      await messageController.menu(bot, chatId);
      return;

    default:
      await messageController.default(bot, chatId);
      return;
  }
}

module.exports = message;
