const express = require('express')

const app = express()

const router = require('./api')

app.use('/api', router)
app.use('*', (req, res) => {
    res.send('404')
})

const port = 8081
app.listen(port, () => console.log(port))