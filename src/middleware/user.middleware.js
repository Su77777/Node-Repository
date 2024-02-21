// 5.处理user逻辑的中间件
const UserService = require('../service/user.service')
const { NAME_OR_PASSWORD_IS_REQUIRED,NAME_IS_ALREADY_EXISTS } = require('../constant/index')
const md5password = require('../utils/handle-password')

const verifyUser = async (ctx,next)=>{
  // 验证用户传递过来的信息
  const { name , password } = ctx.request.body
  if(!name || !password){
    return ctx.app.emit('error',NAME_OR_PASSWORD_IS_REQUIRED,ctx)
  }
  // 验证用户传递过来的信息是否存在于数据库
  const findUserRes = await UserService.findUserByName(name)
  if(findUserRes.length) {
    return ctx.app.emit('error',NAME_IS_ALREADY_EXISTS,ctx)
  }
  await next()
}
// 6.对密码进行加密
const handlePassword = async (ctx,next) => {
  // 取出密码
  const { password } = ctx.request.body
  // 对密码进行加密后放回body
  ctx.request.body.password = md5password(password)

  await next()
}

module.exports = { verifyUser,handlePassword }