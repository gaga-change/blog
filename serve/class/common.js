/**
 * 公共类方法
 */

const error = require('../error')

module.exports = {
    /** 是否为 null 或 undefined */
    _isNull: val => val === null || val === undefined,
    /** 是否为 null 或 undefined 或 空字符串 */
    _isEmpty: val => !val,
    /** 删除 null 或 undefined 属性 */
    _delNull: function () {
        for (let key in this) {
            if (this._isNull(this[key])) {
                delete this[key]
            }
        }
    },
    /** 长度校验 */
    checkLength: function (val, maxLength, minLength) {
        if (this._isEmpty(val)) return val
        minLength = minLength || 1
        if (val.length > maxLength || val.length < minLength) {
            throw error.lengthOverflow
        } else {
            return val
        }
    },
    /** 非空校验 */
    checkNull: function (val) {
        for (let i = 0; i < arguments.length; i++) {
            if (this._isEmpty(arguments[i])) {
                throw error.isNull
            } else {
                if (i == arguments.length - 1)
                    return val
            }
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
    checkEmail: function (val) {
        if (this._isEmpty(val)) return val
        const regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
        if (!regex.test(val)) {
            throw error.emailCheckFalse
        } else {
            return val
        }
    },
    // 网址校验
    checkUrl: function (val) {
        if (this._isEmpty(val)) return val
        const regex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        if (!regex.test(val)) {
            throw error.urlCheckFalse
        } else {
            return val
        }
    }
}