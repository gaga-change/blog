
/**
 * table_article
 */

const query = require('./pool')
const mysql = require('mysql')
const tools = require('./tools')

/** 插入新 `文章` 
 * @param {Tag} article
*/
exports.insert = (article) => {
    return query('INSERT INTO article SET ?', [article])
}

/**
 * 删除 `文章`
 * @param {String} id `文章`ID值
 */
exports.delete = (id) => {
    return query('DELETE FROM article WHERE id = ?', [id])
}

/** 更新
 * @param {Article} article
 */
exports.update = (article) => {
    return query('UPDATE article SET ? WHERE id = ?', [article, article.id])
}

/**
 * 搜索文章
 * @param {Object} params
 */
exports.search = async (params) => {
    let sql = `SELECT SQL_CALC_FOUND_ROWS ${tools.select(params.select)} FROM article ${tools.where(params.where)} ${tools.order(params.order)} LIMIT ?, ?`
    let date = Date.now()
    let rows = await query(sql, [params.start, params.length])
    let foundRows = await query('SELECT found_rows() as count')
    return Promise.resolve({count: foundRows.count, rows, searchTime: Date.now() - date})
}

exports.count = () => {
    return query ('SELECT COUNT(*) as ')
}