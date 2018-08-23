const KOA = require('koa')
const routes = require('../controller')
const PORT = 5000
const app = new KOA()
const serve = require('koa-static')
const path = require('path')
const { connect, initSchemas } = require('../database/init');
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')

;(async () => {
  await connect();
  initSchemas();
})();

app.use(bodyParser())

app.use(cors({
  // 'Access-Control-Allow-Headers': ['Cookies', 'Cookie', 'Origin', 'Bestmath-Token'],
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(routes)

app.use(serve(path.join(__dirname, '../page'), {extensions: ['html']}));

app.listen(PORT)

console.log('server listening at port:' + PORT + '!');
