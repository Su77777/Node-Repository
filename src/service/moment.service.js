const connection = require('../app/database')
class MonmentService {
  async create(content,userId){
    const statement  = 'INSERT INTO `moment`(content,user_id) VALUES (?,?)'
    const [values] = await connection.execute(statement,[content,userId])
    console.log(values);
    return values
  }
  async queryList(offset = 0,size = 10) {
    const statement = `
    SELECT m.id id,m.content content,m.createAt createAt,m.updateAt updateAt,
      JSON_OBJECT('id',u.id,'name',u.name,'avatar_url',u.avatar_url,'createTime',u.createtAt,'updateTime',u.updateAt) user,
      (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
      (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id  ) labelCount
    FROM moment m
    LEFT JOIN users u on m.user_id = u.id  
    LIMIT ? offset ?;
    `
    const [values] = await connection.execute(statement,[size,offset])
    return values
  }
  async queryByid(momentId) {
    const statement = `
    SELECT m.id id,m.content content,m.createAt createAt,m.updateAt updateAt,
      JSON_OBJECT('id',u.id,'name',u.name,'avatar_url',u.avatar_url,'createTime',u.createtAt,'updateTime',u.updateAt) user,
        (
          SELECT
          JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id
        ,'user',JSON_OBJECT('id',cu.id,'name',cu.name,'avatar_url',cu.avatar_url))) 
          FROM comment c
          LEFT JOIN users cu ON c.user_id = cu.id
          WHERE c.moment_id = m.id
        ) comments,
        (
        JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)) 
        ) labels
    FROM moment m
    LEFT JOIN users u on m.user_id = u.id
    LEFT JOIN moment_label ml on ml.moment_id = m.id
    LEFT JOIN labels l on ml.label_id = l.id
    WHERE m.id = ?
    GROUP BY m.id;
    `
    const [values] = await connection.execute(statement,[momentId])
    return values
  }
  async momentUpdate(content,momentId) {
    const statement = `UPDATE moment SET content = 
    ? WHERE id = ?;`
    const [values] = await connection.execute(statement,[content,momentId])
    return values
  }
  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?`
    const [values] = await connection.execute(statement,[momentId])
    return values
  }
  async hasLabel(momentId,labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
    const [values] = await connection.execute(statement,[momentId,labelId])
    return !!values.length
  }
  async addLabel(momentId,labelId) {
    const statement = `INSERT INTO moment_label(moment_id,label_id) VALUES(?,?);`
    const [values] = await connection.execute(statement,[momentId,labelId])
    return values
    
  }
}


module.exports = new MonmentService()

