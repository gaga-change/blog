const mysql = require('mysql')

exports.order = (order) => {
    if (order) {
        let ret = []
        order = order.split(',')
        order.forEach(item => {
            if (!item.indexOf('-')) { // 有带 【-】
                item = item.substr(1)
                ret.push(mysql.escapeId(item) + ' DESC')
            } else {
                ret.push(mysql.escapeId(item) + ' ASC')
            }
        })
        if (ret.length) {
            return 'ORDER BY ' + ret.join(',')
        } else {
            return ''
        }
    }
}
exports.select = (select) => {
    if (select) {
        let ret = []
        select = select.split(',')
        select.forEach(item => {
            ret.push(mysql.escapeId(item))
        })
        return ret.join(',')
    } else {
        return '*'
    }
}