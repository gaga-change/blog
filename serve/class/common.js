/**
 * 公共类方法
 */

const error = require('../error')

module.exports = {
    /** 非空校验 */
    checkNull: function (val) {
        if (!val) {
            throw error.isNull
        } else {
            return val
        }
    },
    /** 空字符串校验 */
    checkEmpty: function (val) {
        if (val == '') {
            throw error.isEmpty
        } else {
            return val
        }
    },
    // 邮箱校验
    checkEmail: function (email) {
        const regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
        if (!regex.test(email)) {
            throw error.emailCheckFalse
        } else {
            return email
        }
    }
}