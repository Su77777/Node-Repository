const fs = require('fs')
const path = require('path')
// 这里有个问题需要注意 fs可读流是相对路径 他是根据package.js文件里面的./src下有关系的 所以需要把路径写完全
// 默认情况下 相对目录和node启动目录有关系 相对目录是相对于./src
// __dirname 当前目录路径
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/private.key'))
const PUBLIC_KEY = fs.readFileSync('./src/config/keys/public.key')

module.exports = {
  PRIVATE_KEY,
  PUBLIC_KEY
}