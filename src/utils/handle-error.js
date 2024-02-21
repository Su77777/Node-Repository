// 5.处理错误事件 监听错误事件
const app = require('../app/index')
const { NAME_OR_PASSWORD_IS_REQUIRED,NAME_IS_ALREADY_EXISTS,NAME_IS_NOT_EXISTS, PASSWORD_IS_ERROR, UN_AUTHORIZATION, OPERATION_IS_NOT_ALLOWED } = require('../constant/index')


app.on('error',(error,ctx) => {
  let code = 0
  let message = ''
  switch(error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001,
      message = '用户名或密码不能为空'
    break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002,
      message = '用户名已存在'
    break
    case NAME_IS_NOT_EXISTS:
      code = -1003,
      message = '用户名不存在,请检查用户名'
    break
    case PASSWORD_IS_ERROR:
      code = -1004,
      message = '密码不正确,请检查密码'
    break
    case UN_AUTHORIZATION:
      code = -1005,
      message = '无效token'
    break
    case OPERATION_IS_NOT_ALLOWED:
      code = -2001
      message = '没有操作权限'
  }
  ctx.body = {
    code,
    message
  }
})