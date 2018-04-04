const mysql = require('mysql')

exports.order = (order) => {
    let sql = ''
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
            sql = 'ORDER BY ' + ret.join(',')
        }
    }
    return sql
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
exports.where = (wh) => {
    let sql = ''
    if (wh) {
        let ret = []
        wh = wh.split(',')
        wh.forEach(item => {
            item = item.split('|')
            if (item.length == 2 && item[0] && item[1]) {
                ret.push(mysql.escapeId(item[0]) + '=' + mysql.escape(item[1]))
            }
        })
        if (ret.length) {
            sql = 'WHERE ' + ret.join(' AND ')
        }
    }
    return sql
}