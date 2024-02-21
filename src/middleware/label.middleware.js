const labelService = require("../service/label.service")



const verifyLabelExists = async (ctx,next) => {
  // 获取labels
  const {labels } = ctx.request.body
  // 查询label是否存在数据库
  const newLabelObject = []
  for(const name of labels) {
    const res = await labelService.queryLabelByName(name)
    const labelObject = { name }
    if(res) {//获取name对应的labelid
      labelObject.id = res.id //{name:'篮球',id:1}
    } else {
      const insertResult = await labelService.create(name)
      labelObject.id = insertResult.insertId
    }
    newLabelObject.push(labelObject)
  }
  ctx.labels = newLabelObject
  await next()
}


module.exports = verifyLabelExists