const Telegram = require('telegraf');
require('dotenv').config();
const companies = require('./companies');

const bot = new Telegram(process.env.TOKEN);
const { telegram } = bot;
const baseUrl = `https://api.telegram.org/file/bot${process.env.TOKEN}`;

bot.on('text', (ctx) => {
  ctx.reply('hi!');
  console.log('hi');
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

/**
 * [{
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
  }]
 */

bot.on('inline_query', (ctx) => {
  ctx.answerInlineQuery(companies.map(c => ({
    type: 'article',
    title: c.name,
    id: c.id,
    input_message_content: {
      message_text: c.address,
    },
  })));
});

bot.on('callback_query', (ctx) => {
  ctx.editMessageText(`edited, ${Math.ceil(Math.random() * 10)}`, {
    reply_markup: {
      inline_keyboard: [[
        {
          text: `edited text, ${Math.ceil(Math.random() * 10)}`,
          callback_data: 'edited_button',
        },
      ]],
    },
  });
});

bot.startPolling();

