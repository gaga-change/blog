
/**
 * table_article
 */

const query = require('./pool')
const mysql = require('mysql')

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

/** 搜索所有`文章` */
exports.select = () => {
    return query('SELECT * FROM article')
}
