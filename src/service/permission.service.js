const connection = require('../app/database')
class PermissionService {
 async checkResource(resourceName,resourceId,userId) {
  const statement  = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`
    const [values] = await connection.execute(statement,[resourceId,userId])
    return !!values.length
 }
}

module.exports = new PermissionService()
