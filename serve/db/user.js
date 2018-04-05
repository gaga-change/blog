const DataUser = require('../mysql/user')
const User = require('../class/User')
const error = require('../error')

/** 搜索 */
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
exports.register = async (req, res, next) => {
    try {
        let user = new User()
        // 必填校验
        user.check(req.body.username, req.body.password, req.body.email)
        // 判断用户是否已存在
        let rows = await DataUser.findUserForUsernameOrEmail(req.body.username, req.body.email)
        // 用户已存在退出
        if (!rows.length == 0)
            throw error.usernameOrEmailAlreadyExist
        // 创建用户对象
        user = new User(req.body)
        // 数据库增加该用户
        let obj = await DataUser.addUser(user)
        // 转变为已登入
        req.session.user = { id: obj.insertId, ...user }
        res.send({
            data: req.session.user
        })
    } catch (err) {
        next(err)
    }
}

/** 获取当前登入用户 */
exports.getUser = (req, res, next) => {
    res.send({ data: req.session.user })
}

/** 登入 */
exports.login = async (req, res, next) => {
    try {
        let user = new User()
        let usernameOrEmail = req.body.usernameOrEmail
        user.checkNull(usernameOrEmail)
        user.checkPassword(req.body.password)
        let rows = await DataUser.findUserForUsernameOrEmail(usernameOrEmail, usernameOrEmail)
        if (!rows.length) // 用户名不存在
            throw error.loginFail
        // 密码校验
        if (user.encryptPassword(req.body.password, rows[0].salt) == rows[0].hashed_password) { // 密码正确
            req.session.user = rows[0]
            res.send({ data: rows[0] })
        } else { // 密码错误
            throw error.loginFail
        }
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