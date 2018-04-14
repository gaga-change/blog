/**
 * 公共类方法
 */

const error = require('../error')

module.exports = {
    /** 是否为 null 或 undefined */
    _isNull: function (val) {
        return (val === null || val === undefined)
    },
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
        if (this._isNull(val)) return null
        minLength = minLength || 1
        if (val.length > maxLength || val.length < minLength) {
            throw error.lengthOverflow
        } else {
            return val
        }
    },
    /** 非空校验 */
    checkNull: function (val) {
        if (!val instanceof Array) {
            val = [val]
        }
        for (let i = 0; i < val.length; i++) {
            if (this._isNull(val[i])) {
                throw error.isNull
            } else {
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
    checkEmail: function (email) {
        if (this._isNull(email)) return null
        const regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
        if (!regex.test(email)) {
            throw error.emailCheckFalse
        } else {
            return email
        }
    },
    // 网址校验
    checkUrl: function (url) {
        if (this._isNull(url)) return null
        const regex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        if (!regex.test(url)) {
            throw error.urlCheckFalse
        } else {
            return url
        }
    }
}