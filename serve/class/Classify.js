/**
* 博客分类目录 
*/
const error = require('../error')
const common = require('./common')

function Classify({ name }) {
    this.id
    this.name = this.checkLength(name, 10)
    this.checkNull(name)
}

/** 继承公共原型 */
Classify.prototype = Object.create(common)

Classify.prototype.modify = function ({id}) {
    this.id = id
    this.checkNull(id)
}

module.exports = Classify

