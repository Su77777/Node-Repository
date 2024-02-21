const KoaRouter  = require('@koa/router')
const { verifyAuthorization } = require('../middleware/login.middleware')
const labelController = require('../controller/label.controller')

const labelRouter = new KoaRouter({prefix:'/label'})

labelRouter.post('/',verifyAuthorization,labelController.create)
labelRouter.get('/list',verifyAuthorization,labelController.queryList)

module.exports = labelRouter