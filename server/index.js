const KOA = require('koa')
const routes = require('../controller')
const PORT = 5000
const app = new KOA()
const serve = require('koa-static')
const path = require('path')
const { connect, initSchemas } = require('../database/init');

;(async () => {
  await connect();
  initSchemas();
})();

app.use(routes)

app.use(serve(path.join(__dirname, '../page'), {extensions: ['html']}));

app.listen(PORT)

console.log('server listening at port:' + PORT + '!');
