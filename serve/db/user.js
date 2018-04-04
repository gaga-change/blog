const DataUser = require('../mysql/user')
const { User, UserPro } = require('../class/User')
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
                    req.session.user = { id: obj.insertId, ...user }
                    res.send({
                        data: req.session.user
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

/** 获取当前登入用户 */
exports.getUser = (req, res, next) => {
    res.send({ data: req.session.user })
}

/** 登入 */
exports.login = (req, res, next) => {
    try {
        UserPro.checkUsername(req.body.username)
        UserPro.checkPassword(req.body.password)
        DataUser.search({
            where: `username|${req.body.username}`,
        }).then(rows => {
            if (rows.length) {
                if (UserPro.encryptPassword(req.body.password, rows[0].salt) == rows[0].hashed_password) {
                    req.session.user = rows[0]
                    res.send({ data: rows[0] })
                } else {
                    next(error.loginFail)
                }
            } else {
                next(error.loginFail)
            }
        }).catch(err => next(err))
    } catch (err) {
        next(err)
    }
}

/** 退出登入 */
exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) next(err)
        else {
            res.send({})
        }
    })
}