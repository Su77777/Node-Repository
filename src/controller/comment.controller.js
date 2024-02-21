const commentService = require("../service/comment.service")

class CommentController {
  async create (ctx,next) {
    // 获取评论内容和评论的动态的id
    const { content , momentId } = ctx.request.body
    // 获取用户id
    const { id } = ctx.user
    const res = await commentService.create(content,momentId,id)
    ctx.body = {
      code:0,
      message:'发表动态成功',
      data:res
    }
  }
  async reply (ctx,next) {
    // 获取评论内容和评论的动态的id
    const { content , momentId,commentId } = ctx.request.body
    // 获取用户id
    const { id } = ctx.user
    const res = await commentService.reply(content,momentId,commentId,id)
    ctx.body ={
      code:0,
      message:'回复评论成功',
      data:res
    }
  }
}


module.exports = new CommentController()