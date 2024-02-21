// 4.写路由相关的逻辑
const {  createReadStream } = require("fs")
const UserService  = require('../service/user.service')
class UserController {
  async create(ctx,next) {
    // 获取用户传递过来的信息
    const user  = ctx.request.body
    // 将user信息存储到数据库中
    const createRes = await UserService.create(user)
    // 查看存储结果,告知前端存储成功
    ctx.body = {
      message:'创建用户成功',
      data:createRes
    }
  }
  async showAvatar(ctx,next) {
    const {userId} = ctx.params
    const avatarInfo = await UserService.queryUserAvatar(userId)
    ctx.type = avatarInfo.mimetype
    ctx.body = createReadStream(`./uploads/${avatarInfo.filename}`)
  }
}

module.exports = new UserController()