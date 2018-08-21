const Router = require('koa-router')
const router = new Router()
const parser = require('ua-parser-js')
const internalIp = require('internal-ip')
const timestamp = require('time-stamp')
const mongoose = require('mongoose')
const uniqueString = require('unique-string')
// console.log(mongoose)
// const UserAgent = mongoose.model('userAgent')

router.get('/report', (ctx, next) => {
  const UserAgent = mongoose.model('userAgents')
  let newUa
  let uid = uniqueString()
  let ua = parser(ctx.request.header['user-agent'])
  newUa = Object.assign({}, ua, {
    ip: internalIp.v4.sync(), 
    time: timestamp('YYYY/MM/DD HH:mm:ss'),
    _uid: uid
  })
  // 存入cookie的uid, 第一次访问没有
  let user_uid = ctx.cookies.get('user_uid')
  // 如果存在user_uid，并且收到客户端发来的用户token和电话号码则进行更新
  if (user_uid) {
    UserAgent.findOneAndUpdate({
      _uid: user_uid
    })
  } else {
    // 写入cookie, 当用登陆成功后再次请求这个接口，
    // 根据cookie查找出之前的数据把token和手机号存入。
    // 因为有cookie存在避免了用户刷新页面多次请求接口
    // 造成数据反复存储
    ctx.cookies.set('user_uid', uid, {
      domain:'192.168.1.81',
      path:'/report',   //cookie写入的路径
      maxAge:1000*60*60*1,
      expires:new Date('2018-08-21'),
      httpOnly:false,
      overwrite:false
    })
    
    userAgent = new UserAgent(newUa)
    userAgent.save(newUa, (err) => {
      console.log(err);
    })
  }

  ctx.body = JSON.stringify(newUa, null, ' ');
})

router.get('/a', (ctx, next) => {
  ctx.body = 'a'
})

module.exports = router.routes()