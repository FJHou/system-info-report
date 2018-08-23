const Router = require('koa-router')
const router = new Router()
const parser = require('ua-parser-js')
const internalIp = require('internal-ip')
const timestamp = require('time-stamp')
const mongoose = require('mongoose')
const uniqueString = require('unique-string')

router.post('/report', (ctx, next) => {
  const {phone, token, uid} = ctx.request.body
  const db = mongoose.model('userAgents')
  let _uid = uid || uniqueString()
  let ua = parser(ctx.request.header['user-agent'])
  let newUa = Object.assign({}, ua, {
    ip: internalIp.v4.sync(),
    time: timestamp('YYYY/MM/DD HH:mm:ss'),
    _uid,
    phone,
    token
  })
  // ******MARK:******
  // 解决不了无法写入cookie的问题，暂时废弃
  // 存入cookie的uid, 第一次访问没有
  // let user_uid = ctx.cookies.get('user_uid')
  // console.log(user_uid)
  // 如果存在user_uid，并且收到客户端发来的用户token和电话号码则进行更新
  // ******MARK:******
  db.findOne({ _uid }, {}, (err, docs) => {
    if (err) {
      ctx.body = {
        success: false,
        message: err.message,
      }

      return;
    }

    if (docs) {
      db.findOneAndUpdate({
        _uid: _uid
      })
    } else {
      userAgent = new db(newUa)
      userAgent.save(newUa)
    }
  })
  // ******MARK:******
  // 写入cookie, 当用登陆成功后再次请求这个接口，
  // 根据cookie查找出之前的数据把token和手机号存入。
  // 因为有cookie存在避免了用户刷新页面多次请求接口
  // 造成数据反复存储
  // ctx.cookies.set('user_uid', uid, {
  //   domain:'localhost',
  //   path: '/',
  //   maxAge: 1000,   // cookie有效时长
  //   expires: new Date('2018-02-08'), // cookie失效时间
  //   httpOnly: false,
  //   overwrite: false
  // })
  // ******MARK:******


  ctx.body = {
    success: true,
    data: {
      uid: _uid
    }
  }
})

router.get('/a', (ctx, next) => {
  ctx.cookies.set('user_uid', '123', {
    domain:'localhost',
    path: '/',
    maxAge: 1000, //1000*60*60*1,
    httpOnly:false,
    overwrite:false
  })
  ctx.body = 'aaaaaa'
})

module.exports = router.routes()