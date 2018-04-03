const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

const router = require('./router.js')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

// 日志
app.use((req, res, next) => {
    console.log('%s %s %s', req.method, req.url, req.path);
    next()
})
// api 请求
app.use('/api', router)
// 404 处理
app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})
// 异常处理
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({err})
})

const port = 8081
app.listen(port, () => console.log(port))