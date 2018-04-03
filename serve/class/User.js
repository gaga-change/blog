const crypto = require('crypto')

/**
 * 用户类
 * @param {String} username 
 * @param {String} hashed_password 
 * @param {String} salt 
 */
function User(username, hashed_password, salt) {
    this.username = username
    this.hashed_password = hashed_password
    this.salt = salt
}

User.prototype.setPassword = function (password) {
    this.salt = this.makeSalt
    this.hashed_password = this.encryptPassword(password)
}

User.prototype.makeSalt = function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
}

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