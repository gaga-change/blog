const crypto = require('crypto')

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

/** 校验所有参数 */
User.prototype.check = function (username, password) {
    this.checkUsername(username)
    this.checkPassword(password)
}

/** 用户名校验，非空，长度小于11 */
User.prototype.checkUsername = function (username) {
    if (!username || username.length > 10) {
        throw new Error('用户名不能为空，且长度最多10位')
    }
}

/** 密码校验，非空，长度小于16且大于5 */
User.prototype.checkPassword = function (password) {
    if (!password || password.length < 6 || password.length > 15) {
        throw new Error('密码不能为空，长度最小6位，最多15位')
    }
}

/** 创建salt */
User.prototype.makeSalt = function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
}

/** 加密密码并返回加密后的值 */
User.prototype.encryptPassword = function (password) {
    if (!password) return ''
    try {
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (err) {
        console.err(err)
        return ''
    }
}

module.exports = User