const Router = require('koa-router')
const router = new Router()
const parser = require('ua-parser-js');
const internalIp = require('internal-ip');
router.get('/', (ctx, next) => {
  // ctx.body = `<h1>${ctx.request.header['user-agent']}</h1>`
  let ua = parser(ctx.request.header['user-agent']);
  let newUa = Object.assign({}, ua, {ip: internalIp.v4.sync()})
  // write the result as response
  ctx.body = JSON.stringify(newUa, null, '  ');
  // console.log(internalIp.v4.sync())
})

router.get('/useragent', (ctx, next) => {
  ctx.body = ctx
})

module.exports = router.routes()