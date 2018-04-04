const DataUser = require('../mysql/user')
const {User, UserPro} = require('../class/User')
const error = require('../error')
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
        UserPro.checkUsername(req.body.username)
        DataUser.search({
            where: `username|${req.body.username}`,
        }).then(rows => {
            if (rows.length == 0) {
                let user = new User(req.body.username, req.body.password)
                return DataUser.addUser(user).then(obj => {
                    res.send({
                        data: {
                            id: obj.insertId,
                            ...user
                        }
                    })
                })
            } else {
                next(error.usernameAlreadyExist)
            }
        }).catch(err => next(err))
    } catch (err) {
        next(err)
    }
}