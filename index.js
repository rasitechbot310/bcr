const TelegramBot = require('node-telegram-bot-api')
const bcrypt = require('bcrypt')

const token = "5697903694:AAEBqVdlxMI3ySRiXbXcX1eoXXfr5FtjMSE";
const bot = new TelegramBot(token, {polling: true})

var cost = 10

bot.onText(/\/cost (.+)/, async (msg, match) => {
  cost = match[1];
  bot.sendMessage(msg.chat.id, "Cost Factor : " + match[1]);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  bcrypt.hash(message, 10, (err, hash) => {
    if (err) {
      bot.sendMessage(chatId, "Error: " + err);
    } else {
        bot.sendMessage(chatId, "`" + hash + "`", {
          parse_mode: "MarkdownV2",
      });
    }
  });
});
