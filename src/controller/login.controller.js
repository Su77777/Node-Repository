const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/screct')
class LoginController {
  sign(ctx,next){
    // 验证成功颁发token
    const {id,name} = ctx.user

    const token = jwt.sign({id,name},PRIVATE_KEY,{
      expiresIn:24 * 60 * 60 * 5,
      algorithm:'RS256'
    })
    ctx.body = {code:0,data:{
      id,
      name,
      token
    }}
  }
  test(ctx,next){
    ctx.body = '1'
  }
}


module.exports = new LoginController()