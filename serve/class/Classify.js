/**
* 博客分类目录 
*/
const error = require('../error')
const common = require('./common')

function Classify ({name}) {
    this.id
    this.name = this.checkNull(name)
}

/** 继承公共原型 */
Classify.prototype = Object.create(common)

/**
 * 校验ID是否正常且保存
 * @param {String} id 
 */
Classify.prototype.checkIdAndSave = function(id) {
    this.checkNull(id)
    this.id = id
}

module.exports = Classify

