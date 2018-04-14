/**
* 博客评论 
*/
const error = require('../error')
const common = require('./common')

function Comment ({article_id, username, email, address, comment, father_id, show}) {
    this.id
    this.article_id // 文章ID
    this.username // 用户名
    this.email // 邮箱
    this.address // 网址
    this.comment // 评论内容
    this.father_id // 父评论
    this.create_time // 创建时间
    this.show // 是否展示

    this.son_num // 子评论数量
}

/** 继承公共原型 */
Comment.prototype = Object.create(common)

Comment.prototype.create = function () {
    this.checkNull()
}

/** 用户名校验，非空，长度小于11 */
Comment.prototype.checkUsername = function (username) {
    if (!username || username.length > 10) {
        throw error.usernameCheckFalse
    } else {
        return username
    }
}

module.exports = Comment
