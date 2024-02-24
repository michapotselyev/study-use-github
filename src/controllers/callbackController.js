class CallbackController {
  async getPoductsByCat(bot, chatId, catId) {
    await bot.sendMessage(chatId, `You choose category number ${catId[1]}`);
    return;
  }
}

module.exports = new CallbackController();
