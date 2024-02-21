// 3.1创建数据库 链接数据库
const mysql = require('mysql2')
// 如果我们每接收一个客户端请求，就建立一次连接或多个连接，很浪费服务端的资源。
// 所以在服务端应用程序中需要为多个数据库连接创建并维护一个连接池，当连接不需要的时候，这些连接可以缓存在连接池中，当接收到下一个客户端请求时，从连接池中取出连接，就不需要再重新建立连接。
// createPool 创建连接池 提高性能
const connectionPool = mysql.createPool({
  host:'localhost',
  port:3306,
  database:'SywHub',
  user:'root',
  password:'Sywsywsyw123',
  connectionLimit:5 
})

// 测试是否和数据库连接成功
connectionPool.getConnection((err,connection)=>{
  if(err) {
    console.log('数据库连接失败',err);
    return
  }
  connection.connect(err=>{
    if(err) {
      console.log('连接失败',err);
    } else {
      console.log('数据库连接成功,可进行交互');
    }
  })
})


// 获取连接池中的链接对象
const connection = connectionPool.promise()


module.exports = connection