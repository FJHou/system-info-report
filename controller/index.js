const Router = require('koa-router')
const router = new Router()

router.get('/', (ctx, next) => {
  ctx.body = `<h1>${ctx.request.header['user-agent']}</h1>`
})

router.get('/useragent', (ctx, next) => {
  ctx.body = ctx
})

module.exports = router.routes()