/**
* 博客分类目录 
*/
const error = require('../error')
const common = require('./common')

function Classify ({name}) {
    this.name = this.checkNull(name)
}

/** 继承公共原型 */
Classify.prototype = Object.create(common)

// Term.prototype

module.exports = Classify

