
const express = require('express')
const router = express.Router()

const user = require('./db/user.js')
const common = require('./db/common')

router.get('*', common.init)
router.get('/user/search',common.search, user.search) // 搜索
router.post('/user/register', user.register) // 注册
router.get('/user/session', user.getUser) // 获取当前登入用户
router.get('/user/logout', user.logout) // 退出登入

module.exports = router