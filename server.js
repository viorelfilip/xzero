var koa = require('koa');
var serve = require('koa-static');
var xzero = require('./src/xzero');
var router = require('koa-router')();

var app = koa();
app.use(serve('.'));
router.get('/register', xzero.register);
router.get('/status', xzero.status);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(80);
