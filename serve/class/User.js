const crypto = require('crypto')
const error = require('../error')
/**
 * 用户类
 * @param {String} username 
 * @param {String} password 
 */
function User(username, password) {
    this.check(username, password)
    this.username = username
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
}
let pro = {}
/** 校验所有参数 */
pro.check = function (username, password) {
    this.checkUsername(username)
    this.checkPassword(password)
}

/** 用户名校验，非空，长度小于11 */
pro.checkUsername = function (username) {
    if (!username || username.length > 10) {
        throw error.usernameCheckFlase
    }
}

/** 密码校验，非空，长度小于16且大于5 */
pro.checkPassword = function (password) {
    if (!password || password.length < 6 || password.length > 15) {
        throw error.passwordChekcFlase
    }
}

/** 创建salt */
pro.makeSalt = function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
}

/** 加密密码并返回加密后的值 */
pro.encryptPassword = function (password) {
    if (!password) return ''
    try {
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (err) {
        console.err(err)
        return ''
    }
}
User.prototype = pro

module.exports.User = User
module.exports.UserPro = pro