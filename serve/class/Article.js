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
 * 创建一个新文章
 * @param {Object} params
 */
Article.create = function() {
    this.create_time = new Date()
    this.modify_time = new Date()
}

/** 更新文章处理某些参数 */
Article.modify = function ({id}) {
    this.checkNull(id)
    this.id = id
    this.modify = new Date()
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
