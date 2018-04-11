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
    }
}