const express = require('express')

const app = express()
// const router = require('express').Router()

const router = require('./router.js')

app.use((req, res, next) => {
    console.log('%s %s %s', req.method, req.url, req.path);
    next()
})
app.use('/api', router)
// require('./router.js')(app, router) // 所有api请求
app.use('*', (req, res) => {
    res.send(404)
})

const port = 8081
app.listen(port, () => console.log(port))