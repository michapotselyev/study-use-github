class ErrorHandler {
  async botError(bot, chatId, error) {
    await bot.sendMessage(chatId, 'Ошибка в работе бота! Посмотрите ошибку в терминале!');
    console.log(error.message);
    console.log(error);
  }

  async databaseError(bot, chatId, error) {
    await bot.sendMessage(chatId, 'Ошибка в запросе к базе данных! Посмотрите ошибку в терминале!');
    console.log(error.message);
    console.log(error);
  }
}

module.exports = new ErrorHandler();
