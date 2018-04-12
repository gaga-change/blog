
const express = require('express')
const router = express.Router()

const user = require('./db/user')
const classify = require('./db/classify')
const tag = require('./db/tag')
const article = require('./db/article')
const place = require('./db/place')
const common = require('./db/common')

const admin = common.admin
router.get('*', common.init)

// `用户`
router.get('/user/search', admin, common.search, user.search) // 搜索
router.post('/user/register', user.register) // 注册
router.get('/user/session', user.getUser) // 获取当前登入用户
router.get('/user/logout', user.logout) // 退出登入
router.post('/user/login', user.login) // 登入

// `分类目录`
router.get('/classify', classify.search) // 搜索
router.post('/classify', admin, classify.add) // 增加
router.put('/classify', admin, classify.modify) // 修改
router.delete('/classify', admin, classify.delete) // 删除

// 标签
router.get('/tag', tag.search) // 搜索
router.post('/tag', admin, tag.add) // 增加
router.put('/tag', admin, tag.modify) // 修改
router.delete('/tag', admin, tag.delete) // 删除

// 绑定标签
router.post('/place', admin, place.bind) // 绑定
router.delete('/place', admin, place.remove) // 移除

// 文章
router.get('/article/one', article.searchOne) // 搜索指定文章
router.get('/article', common.search, article.search) // 搜索
router.post('/article', admin, article.add) // 增加
router.put('/article', admin, article.modify) // 修改
router.delete('/article', admin, article.delete) // 删除

module.exports = router