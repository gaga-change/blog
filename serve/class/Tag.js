/**
* 博客标签 
*/
const error = require('../error')
const common = require('./common')

function Tag ({name}) {
    this.id
    this.name = this.checkLength(name, 10)
    this.checkNull(name)
}

/** 继承公共原型 */
Tag.prototype = Object.create(common)

Tag.prototype.modify = function ({id}) {
    this.id = this.checkNull(id)
}

module.exports = Tag

