const { OPERATION_IS_NOT_ALLOWED } = require('../constant')
const PermissionService = require('../service/permission.service')


const verifyPermission = async (ctx,next) => {
//  const { momentId } = ctx.params
// 获取用户id
 const { id } = ctx.user
// 获取动态路由名字
// ctx.params = {momentId:4}
// keyName => momentId
const keyName = Object.keys(ctx.params)[0]
const resourceId = ctx.params[keyName]
const resourceName = keyName.replace('Id','')
 const isPermission = await PermissionService.checkResource(resourceName,resourceId,id)
 if(!isPermission) {
  return ctx.app.emit('error',OPERATION_IS_NOT_ALLOWED,ctx)
 }
 await next()
}


module.exports = verifyPermission