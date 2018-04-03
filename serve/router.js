
const user = require('./db/user.js')
const express = require('express')
const router = express.Router()

router.get('/a', user.test) // 测试接口
router.get('/user', user.search) // 搜索

module.exports = router