/**
 * table_user
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

/**
 * 根据用户名或邮箱查找用户
 * @param {String} username 用户名
 * @param {String} email 邮箱
 */
exports.findUserForUsernameOrEmail = (username, email) => {
    return query('SELECT * FROM user WHERE username=? OR email=?'
        , [username, email])
}

/** 用户注册 */
exports.addUser = (user) => {
    let sql = 'INSERT INTO user SET ?'
    return query(sql, [user])
}