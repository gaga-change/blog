
/**
 * table_place
 */

const query = require('./pool')
const mysql = require('mysql')

/**
 * 增加
 * @param {Place} place 
 */
exports.insert = (place) => {
    return query('INSERT INTO place SET ?', [place])
}

/**
 * 删除
 * @param {Place} place 
 */
exports.delete = (place) => {
    return query('DELETE FROM place WHERE article_id=? AND tag_id=?', [place.article_id, place.tag_id])
}

/**
 * 查询
 * @param {Place} place 
 */
exports.find = (place) => {
    return query('SELECT * FROM place WHERE article_id=? AND tag_id=?', [place.article_id, place.tag_id])
}