const fs = require('fs').promises;
const pug = require('pug');
const pretty = require('pretty');
const { start, newPage } = require('./browser');

const images = ['resources/file_2.jpg', 'resources/file_13.jpg', 'resources/file_18.jpg', 'https://api.telegram.org/file/bot559864732:AAErIewCNOl-Yb-RjDmUJM6vF3FAoAzWgYw/photos/file_18.jpg?file_id=AgADAgADEqkxG0NF-Ek-C_72gMLKu3qgmg4ABKKRn1N5zcA9CRwDAAEC',
  'https://hsto.org/getpro/habr/post_images/438/eaf/7f2/438eaf7f257fd61cb75fb6b741248bb3.jpg'];


async function init() {
  await start();

  const page = await newPage();

  let base64Images = await Promise.all(images
    .filter(i => !i.startsWith('http'))
    .map(i => fs.readFile(i)));

  base64Images = base64Images.map(i => Buffer.from(i).toString('base64'));

  console.log(base64Images);

  const html = pretty(pug.renderFile('./resources/template.pug', {
    title: 'hi!',
    address: '',
    images: base64Images,
  }));

  console.log(html);

  await page.setContent(html);

  await fs.writeFile('index.html', html);

  await page.emulateMedia('screen');

  await page.pdf({
    path: './renderred.pdf',
  });
}

module.exports = init;
