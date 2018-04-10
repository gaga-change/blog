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
function User(obj) {
    if (!obj) return
    this.username = obj.username 
    this.email = obj.email 
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(obj.password)
    this.create_time = new Date() // 创建时间
    this.display_name =  this.checkNull(obj.display_name) 
}

/** 继承公共原型 */
User.prototype = Object.create(common)

/** 校验所有必填参数 */
User.prototype.check = function (username, password, email) {
    this.checkUsername(username)
    this.checkPassword(password)
    this.checkEmail(email)
}

/** 用户名校验，非空，长度小于11 */
User.prototype.checkUsername = function (username) {
    if (!username || username.length > 10) {
        throw error.usernameCheckFalse
    }
}

/** 邮箱校验 */
User.prototype.checkEmail = function (email) {
    const regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
    if (!regex.test(email)) {
        throw error.emailCheckFalse
    }
}

/** 密码校验，非空，长度小于16且大于5 */
User.prototype.checkPassword = function (password) {
    if (!password || password.length < 6 || password.length > 15) {
        throw error.passwordCheckFalse
    }
}

/** 创建salt */
User.prototype.makeSalt = function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
}

/** 加密密码并返回加密后的值 */
User.prototype.encryptPassword = function (password, s) {
    s = s || this.salt
    if (!password) return ''
    return crypto.createHmac('sha1', s).update(password).digest('hex')
}

module.exports = User