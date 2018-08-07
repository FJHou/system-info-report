const KOA = require('koa')
const routes = require('../controller')
const PORT = 5000
const app = new KOA()
// const { connect, initSchemas } = require('../database/init');

app.use(routes)

app.listen(PORT)
console.log('server listening at port:' + PORT + '!');
