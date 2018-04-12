/**
* place
*/
const error = require('../error')
const common = require('./common')

function Place ({article_id, tag_id}) {
    this.article_id = this.checkNull(article_id)
    this.tag_id = this.checkNull(tag_id)
}

/** 继承公共原型 */
Place.prototype = Object.create(common)

module.exports = Place
