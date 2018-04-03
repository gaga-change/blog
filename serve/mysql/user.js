/**
 * table_user
 * 1. 增
 * 2. 删
 * 3. 改
 * 4. 查
*/

const query = require('./pool')


exports.get = () => {
    return query ('SELECT * FROM user')
}

exports.add = (user) => {
    let sql = 'INSERT INTO user set ?'
    return query(sql, [user])
}