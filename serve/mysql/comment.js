
/**
 * table_comment
 */

const query = require('./pool')
const mysql = require('mysql')

/** 插入新 `评论` 
 * @param {Comment} comment
*/
exports.insert = (comment) => {
    return query('INSERT INTO comment SET ?', [comment])
}

/**
 * 删除 `评论`
 * @param {String} id `评论`ID值
 */
exports.delete = (id) => {
    return query('DELETE FROM comment WHERE id = ?', [id])
}

/** 更新
 * @param {Comment} comment
 */
exports.update = (comment) => {
    return query('UPDATE comment SET ? WHERE id = ?', [comment, comment.id])
}

/** 搜索所有`评论` */
exports.select = () => {
    return query('SELECT * FROM comment')
}
