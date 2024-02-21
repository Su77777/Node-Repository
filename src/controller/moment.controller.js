const MomentService = require('../service/moment.service')
class MomentController {
  async create(ctx,next){
    const { content } = ctx.request.body
    const { id } = ctx.user
    const res = await MomentService.create(content,id)
    console.log(res);
    ctx.body = {
      code:0,
      data:{
        message:"创建用户成功",
        id,
        res
      }
    }
  }
  async query(ctx,next) {
    const {offset,size} = ctx.query
    console.log(offset,size);
    const res = await MomentService.queryList(offset,size)

    ctx.body = {
      code:0,
      message:'获取评论列表成功',
      data:{
        res
      }
    }
  }
  async detail(ctx,next) {
    const { momentId } = ctx.params
    const res = await MomentService.queryByid(momentId)
    ctx.body = {
      code:0,
      message:'获取单个列表',
      data:res[0]
    }
  }
  async update(ctx,next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const res = await MomentService.momentUpdate(content,momentId)
    ctx.body = {
      code:0,
      message:'修改动态成功',
      data:res
    }
  }
  async remove(ctx,next) {
    const { momentId } = ctx.params
    const res = await MomentService.remove(momentId)
    ctx.body = {
      code:0,
      message:'删除成功',
      data:res
    }
  }
  async addLabels(ctx,next) {
    const { labels }  = ctx
    const { momentId } = ctx.params
    // 将moment_id和label_id链接关系
    for(const item of labels) {
      // 查询即将要添加的数据是否存在 不存在就添加
      const isExists = await MomentService.hasLabel(momentId,item.id)
      if(!isExists) {
        const res = await MomentService.addLabel(momentId,item.id)
      }
    }
    ctx.body = {
      code:0,
      message:'添加成功',
    }
  }
}

module.exports = new MomentController()