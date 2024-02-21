// 1.监听服务器端口
const app = require('./app')
const { SERVER_PORT } = require('./config/server')
require('./utils/handle-error')



app.listen(SERVER_PORT,()=>{
  console.log('koa服务器已启动');
})