const express = require('express')

const app = express()

const {test} = require('./serve')

app.use('/', (req, res) => {
    res.send({ a: test.a, path: req.path})
})

const port = 8081
app.listen(port, () => console.log(port))