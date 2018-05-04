const puppeteer = require('puppeteer');


let browser;
let page;

async function start() {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  console.log('page');
  await page.goto('http://localhost:8080');
  console.log('open page');
  await page.pdf({ path: 'hn.pdf', format: 'A4' });
  console.log('pdf');

  await browser.close();
  console.log('close');
}

process.on('exit', () => {
  if (browser) {
    browser.close();
  }
});

start();
