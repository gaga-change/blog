function User(obj) {
    this.username = obj.username
    this.email = obj.email
    // this.salt = this.makeSalt()
    // this.hashed_password = this.encryptPassword(obj.password)
}

/**
 * 测试方法
 * @param {String} a 哈哈
 * @param {String} b 呵呵
 */
User.prototype.gaga  = (a, b) => {

}

exports.User = User