const crypto = require('crypto')
const error = require('../error')
const common = require('./common')
/**
 * 用户类
 * @param {obj} obj 请求参数
 *  username 用户名
 *  email 邮箱
 *  password 密码
 *  displayName 真实名
 */
function User({username, email, password, display_name}) {
    this._password = this.checkLength(password, 15, 6)
    this.username = this.checkLength(username, 10) // 用户名，登入用
    this.email = this.checkEmail(email) // 邮箱
    this.salt = this.makeSalt() // salt
    this.hashed_password = this.encryptPassword(this._password) // 根据salt加密后的密码
    this.display_name =  this.checkLength(display_name, 10) // 用户名，展示用
    this.create_time // 创建时间
}

/** 继承公共原型 */
User.prototype = Object.create(common)

User.prototype.create = function () {
    this.checkNull(this.username, this.email, this._password, this.display_name) // 必填校验
    delete this._password // 不存储真实密码
    // 默认值
    this.create_time = new Date()
}

User.prototype.modify = function() {

}

/** 创建salt */
User.prototype.makeSalt = function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
}

/** 加密密码并返回加密后的值 */
User.prototype.encryptPassword = function (val) {
    if (!val) return val
    return crypto.createHmac('sha1', this.salt).update(val).digest('hex')
}

module.exports = User