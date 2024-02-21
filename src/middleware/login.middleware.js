const jwt = require('jsonwebtoken')
const { NAME_OR_PASSWORD_IS_REQUIRED,NAME_IS_NOT_EXISTS, PASSWORD_IS_ERROR,UN_AUTHORIZATION } = require('../constant/index')
const userService = require('../service/user.service')
const md5password = require('../utils/handle-password')
const { PUBLIC_KEY } = require('../config/screct')

// 验证登录
const verifyLogin = async (ctx,next) => {
  // 获取用户传递来的账户和密码
  const { name,password } = ctx.request.body
  // 1.判断用户和密码是否为空
  if(!name || !password) {
    return ctx.app.emit('error',NAME_OR_PASSWORD_IS_REQUIRED,ctx)
  }
  // 2.查询该用户是否存在数据库
  const users = await userService.findUserByName(name)
  const user = users[0]
  if(!user) {
    return ctx.app.emit('error',NAME_IS_NOT_EXISTS,ctx)
  }
  // 3.查询数据库中的密码和用户传递的密码是否一致
  if(user.password !== md5password(password)) {
    return ctx.app.emit('error',PASSWORD_IS_ERROR,ctx)
  }
  ctx.user = user
  // 4.颁发令牌,传入token
  await next()
 }
const verifyAuthorization = async (ctx,next) => {
  // 获取token
  const authorization = ctx.headers.authorization
  
  if(!authorization){
    ctx.app.emit('error',UN_AUTHORIZATION,ctx)
  }
  // 处理token
  const token = authorization.replace('Bearer ','')
  try {
    // 校验token
    const result = jwt.verify(token,PUBLIC_KEY,{
      algorithm:['RS256']
    })
    ctx.user = result
    await next()
  } catch (error) {
    ctx.app.emit('error',UN_AUTHORIZATION,ctx)
  }
}

 module.exports = {
  verifyLogin,
  verifyAuthorization
 }