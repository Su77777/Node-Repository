
const fileService = require("../service/file.service")
const userService = require("../service/user.service")
const {SERVER_HOST,SERVER_PORT} = require('../config/server')
class FileController {
  async create(ctx,next) {
    // 单次上传文件是file
    // 多次上传文件是files
    // console.log(ctx.request.file);
    const {filename,mimetype,size} = ctx.request.file
    const { id } = ctx.user
    const avatarURL = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
    const res = await fileService.create(filename,mimetype,size,id)
    const res2 = await userService.updateUserAvatar(avatarURL,id)
    ctx.body = {
      code:0,
      message:'文件上传成功',
      data:avatarURL
    }
  }
}

module.exports = new FileController()