const KoaRouter = require('@koa/router')

const { verifyAuthorization } = require('../middleware/login.middleware');
const handleFile = require('../middleware/file.middleware');
const FileController = require('../controller/file.controller');

const fileRouter = new KoaRouter({prefix:'/file'})



fileRouter.post('/avatar',verifyAuthorization,handleFile,FileController.create)

module.exports = fileRouter
