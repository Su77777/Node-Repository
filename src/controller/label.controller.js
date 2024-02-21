const labelService = require("../service/label.service")

class LabelController {
  async create(ctx,next){
    const { name } = ctx.request.body

    const res = await labelService.create(name)
    ctx.body = {
      code:0,
      message:'创建标签成功',
      data:res
    }

  }
  async queryList(ctx,next) {
    const res = await labelService.queryList()
    ctx.body = {
      code:0,
      message:'获取标签列表',
      data:res
    }
  }
}


module.exports = new LabelController()