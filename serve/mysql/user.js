/**
 * table_user
 * 1. 增
 * 2. 删
 * 3. 改
 * 4. 查
*/

const query = require('./pool')
const mysql = require('mysql')
const tools = require('./tools')

/**
 * 搜索用户
 * @param {Object} params
 */
exports.search = (params) => {
    let sql = `SELECT ${tools.select(params.select)} FROM user ${tools.where(params.where)} ${tools.order(params.order)} LIMIT ?, ?`
    return query(sql, [params.start || 0, params.length || 1])
}

/** 用户注册 */
exports.addUser = (user) => {
    let sql = 'INSERT INTO user SET ?'
    return query(sql, [user])
}