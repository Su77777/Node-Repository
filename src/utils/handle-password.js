// node自带的加密工具
const crypto = require('crypto')

function md5password(password) {
  // 获取md5加密函数
  const md5 = crypto.createHash('md5')
  // 对密码进行加密 并且使用十六进制
  const md5pwd = md5.update(password).digest('hex')
  // 返回加密后的密码
  return md5pwd
}

module.exports = md5password