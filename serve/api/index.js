const express = require('express')
// const db = require('../db')
const router = express.Router()

router.get('/a', (req, res, next) => {
    res.send('gaga')
})

module.exports = router