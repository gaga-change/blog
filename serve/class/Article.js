/**
* 文章
*/
const error = require('../error')
const common = require('./common')

function Article ({markdown, content, intro, title}) {
    this.id
    this.user_id // 用户ID
    this.create_time // 创建时间
    this.modify_time // 更新时间
    this.markdown = markdown // markdown 内容
    this.content = content // 主体内容
    this.intro = intro // 简介
    this.title = title // 标题
    this.private // 是否私有
    this.post_type // 文章类型 （post 正式版  revision 历史版本）
    this.comment_count // 评论数
    this.post_parent // 父文档ID，历史版本对应的正式版
    this.classify_id // 分类目录ID
}

/** 继承公共原型 */
Article.prototype = Object.create(common)

/**
 * 创建新文章时的相关操作
 * @param {Object} params
 */
Article.prototype.create = function() {
    this.create_time = new Date()
    this.modify_time = new Date()
    this.checkNull(this.title)
}

/** 更新文章是的相关操作 */
Article.prototype.modify = function ({id, title}) {
    this.id = this.checkNull(id)
    this.checkEmpty(this.title) // 空字符串校验
    this.modify_time = new Date()
    for(let key in this) {
        if (this[key] === null || this[key] === undefined) {
            delete this[key]
        }
    }
}

/**
 * 校验ID是否正常且保存
 * @param {String} id 
 */
Article.prototype.checkIdAndSave = function(id) {
    this.checkNull(id)
    this.id = id
}

module.exports = Article