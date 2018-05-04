const http = require('http');
const Koa = require('koa');
const bluebird = require('bluebird');
const serve = require('koa-static');
require('dotenv').config();
const routes = require('./router');

bluebird.promisifyAll(http.Server.prototype);

const app = new Koa();
const server = http.createServer(app.callback());

app.use(serve('./static'));

app.use(routes);

async function init() {
  console.log('starting server');
  await server.listen(process.env.HTTP_PORT || 8080);
  console.log('server started');
}

init();
