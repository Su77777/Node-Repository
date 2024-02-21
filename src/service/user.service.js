// 3.2在这里进行数据库操作
const connection = require('../app/database')

class UserService {
  async create(user) { 
    // 1.获取用户传递过来的信息
    const {name,password} = user
    // 2.把用户信息拼接进sql语句
    const statement = 'INSERT INTO `users`(name,password) values(?,?);'
    // 3.执行sql语句
    const [values] = await connection.execute(statement,[name,password])
    return values
  }
  async findUserByName(name) {
    const statement = 'SELECT * FROM `users` WHERE name = ?;'
    const [values] = await connection.execute(statement,[name])
    return values
  }
  async queryUserAvatar(userId) {
    const statement  = `SELECT * FROM avatar WHERE user_id = ?`
      const [values] = await connection.execute(statement,[userId])
      return values.pop()
   }
   async updateUserAvatar(avatarURL,userId) {
    const statement  = `UPDATE users SET avatar_url = ? WHERE id = ?`
      const [values] = await connection.execute(statement,[avatarURL,userId])
      return values
   }
}

module.exports = new UserService()