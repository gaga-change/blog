
module.exports = {
    /** 非空校验 */
    checkNull: function (val) {
        if (!val) {
            throw error.isNull
        } else {
            return val
        }
    }
}