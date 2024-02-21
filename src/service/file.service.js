const connection = require('../app/database')
class fileService {
 async create(filename,mimetype,size,userId) {
  const statement  = `INSERT INTO avatar(filename,mimetype,size,user_id) values(?,?,?,?);`
    const [values] = await connection.execute(statement,[filename,mimetype,size,userId])
    return values
 }
}

module.exports = new fileService()