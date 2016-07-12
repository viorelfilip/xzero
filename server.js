var koa = require('koa');
var serve = require('koa-static');
var xzero = require('./xzero');
var router = require('koa-router')();
var koaBody = require('koa-body')();

var app = koa();

// app.use(function* (next){
//     console.log('ASTA E CEREREA ............................ UPS : \n' + JSON.stringify(this));
//     yield next;
// });

app.use(serve(__dirname + '/client'));
//app.use(router(app));
router.get('/register', xzero.register);
router.get('/update', xzero.update);
router.get('/createNewGame', xzero.createNewGame);
router.post('/move', koaBody, xzero.move);


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(80);
