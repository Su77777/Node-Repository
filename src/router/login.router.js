const KoaRouter = require('@koa/router')

const loginRouter = new KoaRouter({prefix:'/login'})
const LoginController = require('../controller/login.controller')
const { verifyLogin,verifyAuthorization } = require('../middleware/login.middleware')

loginRouter.post('/',verifyLogin,LoginController.sign)
loginRouter.post('/test',verifyAuthorization,LoginController.test)

module.exports = loginRouter