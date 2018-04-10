
/**
 * table_tag
 */

const query = require('./pool')
const mysql = require('mysql')

/** 插入新 `标签` 
 * @param {Tag} tag
*/
exports.insert = (tag) => {
    return query('INSERT INTO tag SET ?', [tag])
}

/**
 * 删除 `标签`
 * @param {String} id `标签`ID值
 */
exports.delete = (id) => {
    return query('DELETE FROM tag WHERE id = ?', [id])
}

/** 更新
 * @param {Tag} tag
 */
exports.update = (tag) => {
    return query('UPDATE tag SET ? WHERE id = ?', [tag, tag.id])
}

/** 搜索所有`标签` */
exports.select = () => {
    return query('SELECT * FROM tag')
}
