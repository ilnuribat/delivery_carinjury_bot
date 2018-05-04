const fs = require('fs');
const pug = require('pug');
const Router = require('koa-router');
const pretty = require('pretty');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = pretty(pug.renderFile('./resources/template.pug', {
    title: 'hi!',
    address: '',
    images: ['imgs/image.jpg', 'imgs/history.jpg', 'imgs/schedule.jpg', 'https://api.telegram.org/file/bot559864732:AAErIewCNOl-Yb-RjDmUJM6vF3FAoAzWgYw/photos/file_18.jpg?file_id=AgADAgADEqkxG0NF-Ek-C_72gMLKu3qgmg4ABKKRn1N5zcA9CRwDAAEC'],
  }));
  fs.writeFileSync('./static/htmls/renderred.html', ctx.body);
});

module.exports = router.routes();
