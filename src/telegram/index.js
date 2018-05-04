const Telegram = require('telegraf');
require('dotenv').config();

const bot = new Telegram(process.env.TOKEN);
const { telegram } = bot;
const baseUrl = `https://api.telegram.org/file/bot${process.env.TOKEN}`;

bot.on('text', (ctx) => {
  ctx.reply('hi!');
});

bot.on('photo', async (ctx) => {
  ctx.reply('yeah!');
  const { message } = ctx;
  const file = message.photo[message.photo.length - 1];
  const { file_id: fileId } = file;
  const { file_path: filePath } = await telegram.getFile(fileId);
  const url = `${baseUrl}/${filePath}?file_id=${fileId}`;

  console.log(url);
});

bot.on('inline_query', (ctx) => {
  ctx.answerInlineQuery([{
    type: 'article',
    title: 'test',
    id: Math.random() * 1000,
    input_message_content: {
      message_text: 'message',
    },
    reply_markup: {
      inline_keyboard: [
        [{
          text: 'butn1',
          callback_data: 'butn1',
        }],
      ],
    },
  }]);
});

bot.on('callback_query', (ctx) => {
  ctx.editMesssageText('edited');
});

bot.startPolling();

