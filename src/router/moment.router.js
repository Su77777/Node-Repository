const KoaRouter = require('@koa/router')
const { verifyAuthorization } = require('../middleware/login.middleware')
const MomentController = require('../controller/moment.controller')
const verifyPermission = require('../middleware/permission.middleware')
const verifyLabelExists = require('../middleware/label.middleware')


const momentRouter = new KoaRouter({prefix:'/moment'})
// 发表动态
momentRouter.post('/',verifyAuthorization,MomentController.create)
// 获取动态列表
momentRouter.get('/list',MomentController.query)
// 获取单个动态列表
momentRouter.get('/:momentId',MomentController.detail)
// 修改动态
momentRouter.patch('/:momentId',verifyAuthorization,verifyPermission,MomentController.update)
// 删除动态
momentRouter.delete('/:momentId',verifyAuthorization,verifyPermission,MomentController.remove)

momentRouter.post('/:momentId/labels',verifyAuthorization,verifyPermission,verifyLabelExists,MomentController.addLabels)
module.exports = momentRouter