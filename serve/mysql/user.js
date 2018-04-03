/**
 * table_user
 * 1. 增
 * 2. 删
 * 3. 改
 * 4. 查
*/

const query = require('./pool')


exports.search = (params) => {
    console.log(params)
    return query ('SELECT * FROM user LIMIT ?, ?', [params.start, params.length])
}

exports.add = (user) => {
    let sql = 'INSERT INTO user set ?'
    return query(sql, [user])
}