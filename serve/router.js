
const express = require('express')
const router = express.Router()

const user = require('./db/user.js')
const common = require('./db/common')

router.get('*', common.init)
router.get('/user',common.search, user.search) // 搜索
router.post('/user/register', user.register) // 注册

module.exports = router