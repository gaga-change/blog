const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const SessionStore = require('express-mysql-session')(session)

const app = express()

const router = require('./router.js')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'blog'
}
app.use(session({
    secret: '123456',
    name: 'sessionId', // cookie中的键名，用于存储sessionId
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }, // cookie保存的时间
    store: new SessionStore(options),
    resave: false,
    saveUninitialized: false
}))
// 日志
app.use((req, res, next) => {
    console.log('%s %s %s', req.method, req.url, req.path)
    req.session.path = req.path 
    next()
})
// api 请求
app.use('/api', router)
// 静态资源
app.use('/', express.static(path.resolve(__dirname, './public')))
// 404 处理
app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})
// 异常处理
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({ err: err.message, error: err})
})

const port = 8081
app.listen(port, () => console.log(port))