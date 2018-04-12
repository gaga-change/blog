/**
* 文章
*/
const error = require('../error')
const common = require('./common')

function Article({ markdown, content, intro, title, classify_id, private, comment_count, click_num, post_type, post_parent }) {
    this.id
    this.user_id // 用户ID
    this.create_time // 创建时间
    this.modify_time // 修改时间

    this.markdown = markdown // markdown 内容
    this.content = content // 主体内容
    this.intro = intro // 简介
    this.title = title // 标题
    this.classify_id = classify_id // 分类目录ID
    this.private = private // 是否私有(默认true)
    this.post_type = post_type // 文章类型 （post (默认)正式版  revision 历史版
    this.post_parent = post_parent // 父文档ID，历史版本对应的正式版本）
    this.comment_count = comment_count // 评论数 (默认0)
    this.click_num = click_num // 阅览次数
}

/** 继承公共原型 */
Article.prototype = Object.create(common)

/**
 * 创建新文章时的相关操作
 * @param {Object} params
 */
Article.prototype.create = function (user_id) {
    this.create_time = new Date()
    this.modify_time = new Date()
    this.user_id = user_id
    this.checkNull(this.title)
}

/** 更新文章是的相关操作 */
Article.prototype.modify = function ({ id, title }) {
    this.id = this.checkNull(id)
    this.checkEmpty(this.title) // 空字符串校验
    if (this.content) this.modify_time = new Date() // 更新时间与修改内容相关
    for (let key in this) {
        if (this[key] === null || this[key] === undefined) {
            delete this[key]
        }
    }
}

/**
 * 校验ID是否正常且保存
 * @param {String} id 
 */
Article.prototype.checkIdAndSave = function (id) {
    this.checkNull(id)
    this.id = id
}

module.exports = Article
