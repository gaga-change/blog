const DataUser = require('../mysql/user')
const User = require('../class/User')
/**
 * 搜索
 */
exports.search = (req, res, next) => {
    DataUser.search({
        ...req.arg
    }).then(rows => {
        res.send({ data: rows, query: req.query })
    }).catch(err => {
        next(err)
    })
}

/** 注册 */
exports.register = (req, res, next) => {
    try {
        let user = new User(req.body.username, req.body.password)
        res.send(req.body)
    } catch (err) {
        next(err)
    }
}