// 3.创建路由 路由的逻辑和中间件分层两个模块 middleware controller
const KoaRouter = require('@koa/router')
const userRouter = new KoaRouter({prefix:'/users'})
const UserController = require('../controller/user.controller')
const { verifyUser , handlePassword } = require('../middleware/user.middleware')
// 只负责配置路由 逻辑会放在controller里
// user执行步骤:
// 先验证用户发来的账户密码是否符合格式
// 在对密码进行md5 16进制加密处理
// 最后把正确的数据传入数据库
userRouter.post('/',verifyUser,handlePassword,UserController.create)
userRouter.get('/avatar/:userId',UserController.showAvatar)
module.exports = userRouter