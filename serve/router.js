
const express = require('express')
const router = express.Router()

const user = require('./db/user.js')
const common = require('./db/common')

router.get('/a', user.test) // 测试接口
router.get('/user',common.search, user.search) // 搜索

module.exports = router