const puppeteer = require('puppeteer');


let browser = {};

async function start() {
  browser = await puppeteer.launch({ headless: true });
}

async function newPage() {
  return browser.newPage();
}

process.on('exit', () => {
  if (browser) {
    browser.close();
  }
});

module.exports = {
  start,
  newPage,
};
