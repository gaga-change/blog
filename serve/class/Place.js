/**
* place
*/
const error = require('../error')
const common = require('./common')

function Place ({article_id, tag_id}) {
    this.article_id = article_id
    this.tag_id = tag_id
    this.checkNull(article_id, tag_id) // 必填校验
}

/** 继承公共原型 */
Place.prototype = Object.create(common)

module.exports = Place
