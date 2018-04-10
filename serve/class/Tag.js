/**
* 博客标签 
*/
const error = require('../error')
const common = require('./common')

function Tag ({name}) {
    this.id
    this.name = this.checkNull(name)
}

/** 继承公共原型 */
Tag.prototype = Object.create(common)

/**
 * 校验ID是否正常且保存
 * @param {String} id 
 */
Tag.prototype.checkIdAndSave = function(id) {
    this.checkNull(id)
    this.id = id
}

module.exports = Tag

