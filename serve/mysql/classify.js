
/**
 * table_classify
 */
const query = require('./pool')
const mysql = require('mysql')

/** 插入新 `分类` 
 * @param {Classify} classify
*/
exports.insert = (classify) => {
    return query('INSERT INTO classify ?', [classify])
}

/**
 * 删除 `分类`
 * @param {String} id `分类`ID值
 */
exports.delete = (id) => {
    return query('DELETE FROM classify WHERE id = ?', [id])
}

/** 更新
 * @param {Classify} classify
 */
exports.update = (classify) => {
    return query('UPDATE classify SET ? WHERE id = ?', [classify, classify.id])
}

/** 搜索所有`分类` */
exports.select = () => {
    return query('SELECT * FROM classify')
}



