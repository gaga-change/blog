
const express = require('express')
const router = express.Router()

const user = require('./db/user')
const classify = require('./db/classify')
const tag = require('./db/tag')
const common = require('./db/common')

router.get('*', common.init)

// `用户`
router.get('/user/search',common.search, user.search) // 搜索
router.post('/user/register', user.register) // 注册
router.get('/user/session', user.getUser) // 获取当前登入用户
router.get('/user/logout', user.logout) // 退出登入
router.post('/user/login', user.login) // 登入

// `分类目录`
router.get('/classify', classify.search) // 搜索
router.post('/classify', classify.add) // 增加
router.put('/classify', classify.modify) // 修改
router.delete('/classify', classify.delete) // 删除

// 标签
router.get('/tag', tag.search) // 搜索
router.post('/tag', tag.add) // 增加
router.put('/tag', tag.modify) // 修改
router.delete('/tag', tag.delete) // 删除

module.exports = router