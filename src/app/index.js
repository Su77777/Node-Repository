// 2.创建koaRouter对象 创建koa 引入对koabody解析的库
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registerRouter = require('../router/index')
const app = new Koa()


app.use(bodyParser())
// app.use(userRouter.routes())
// // 任何匹配不到的路径都会显示会返回405 Method Not Allowed ，提示方法不被允许
// app.use(userRouter.allowedMethods())
// app.use(loginRouter.routes())
// app.use(loginRouter.allowedMethods())
registerRouter(app)

module.exports = app
