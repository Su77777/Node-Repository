const connection = require('../app/database')
class CommentService {
 async create(comment,momentId,userId) {
  const statement  = `INSERT INTO comment(content,moment_id,user_id) values(?,?,?);`
    const [values] = await connection.execute(statement,[comment,momentId,userId])
    return values
 }
 async reply(comment,momentId,commentId,userId) {
  const statement  = `INSERT INTO comment(content,moment_id,comment_id,user_id) values(?,?,?,?);`
    const [values] = await connection.execute(statement,[comment,momentId,commentId,userId])
    return values
 }
}

module.exports = new CommentService()