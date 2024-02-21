const connection = require('../app/database')

class LabelService {
  async create(name) {
    const statement = 'INSERT INTO `labels`(name) VALUES(?);'
    const [values]  = await connection.execute(statement,[name])
    return values
  }
  async queryList() {
    const statement = 'SELECT * FROM `labels` LIMIT 5 offset 0;'
    const [values]  = await connection.execute(statement)
    return values
  }
  async queryLabelByName(name) {
    const statement = `SELECT * FROM labels WHERE name = ?`
    const [values] = await connection.execute(statement,[name])
    return values[0]
  }
}

module.exports = new LabelService()