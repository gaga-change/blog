
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
    let sql = `SELECT SQL_CALC_FOUND_ROWS id,create_time,title,intro,comment_num,click_num,tags,display_name FROM article_post_public ${tools.where(params.where)} ${tools.order(params.order)} LIMIT ?, ?`
    let date = Date.now()
    let rows = await query(sql, [params.start, params.length])
    let foundRows = await query('SELECT found_rows() as count')
    foundRows = foundRows[0] || { count: 0 }
    return Promise.resolve({ count: foundRows.count, rows, searchTime: Date.now() - date })
}

/**
 * 搜索指定文章
 * @param {String} id 
 */
exports.searchOneById = async (id) => {
    return query('SELECT * FROM article_post_public WHERE id = ?', [id])
}

/**
 * 浏览量加1
 * @param {*} id 
 */
exports.clickNumAdd = async (id) => {
    return query('UPDATE article set click_num = click_num + 1 WHERE id = ?', [id])
}

/**
 * 评论量加1
 * @param {*} id 
 */
exports.commentNumAdd = async (id) => {
    return query('UPDATE article set comment_num = comment_num + 1 WHERE id = ?', [id])
}
