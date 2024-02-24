const callbackController = require("../controllers/callbackController");

async function callback(bot, data) {
  const chatId = data.message.chat.id;

  if (data.data.startsWith('cat')) {
    await callbackController.getPoductsByCat(bot, chatId, data.data.split('cat'));
    return;
  }

  switch (data.data) {

  }
}

module.exports = callback;
