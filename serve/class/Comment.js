/**
* 博客评论 
*/
const error = require('../error')
const common = require('./common')

function Comment ({article_id, username, email, address, comment, father_id}) {
    this.id
    this.article_id = article_id // 文章ID
    this.username = this.checkLength(username, 10) // 用户名
    this.email = this.checkEmail(email) // 邮箱
    this.address = this.checkUrl(address) // 站点
    this.comment = this.checkLength(comment, 150) // 评论内容
    this.father_id = father_id // 父评论

    this.show // 是否展示
    this.create_time // 创建时间
    this.son_num // 子评论数量
}

/** 继承公共原型 */
Comment.prototype = Object.create(common)

/** 创建新对象 */
Comment.prototype.create = function () {
    this.checkNull(this.article_id, this.username, this.email, this.comment) // 必填校验
    // 默认值设定
    this.create_time = new Date()
    this.son_num = 0
    this.show = true
}

/** 修改对象 */
Comment.prototype.modify = function ({id, show}) {
    this.checkEmpty(this.article_id, this.username, this.email, this.comment) // 空字符串校验
    this.id = this.checkNull(id)
    this.show = show
    this.delNull()
}

module.exports = Comment
