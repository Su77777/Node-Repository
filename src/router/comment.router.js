const KoaRouter = require('@koa/router')
const { verifyAuthorization } = require('../middleware/login.middleware')
const commentController = require('../controller/comment.controller')

const commentRouter = new KoaRouter({prefix:'/comment'})

commentRouter.post('/',verifyAuthorization,commentController.create)
commentRouter.post('/reply',verifyAuthorization,commentController.reply)

module.exports  = commentRouter