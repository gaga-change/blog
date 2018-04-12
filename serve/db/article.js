const DBArticle = require('../mysql/article')
const Article = require('../class/Article')
const error = require('../error')

/** 搜索文章（ */
exports.search = async (req, res, next) => {
    try {
        let rows = await DBArticle.search({
            ...req.arg
        })
        res.send({ data: rows, query: req.query })
    } catch (err) { next(err) }
}

/** 新填 `文章` */
exports.add = async (req, res, next) => {
    try {
        let article = new Article(req.body)
        article.create(req.session.user.id) // 创建处理
        let ret = await DBArticle.insert(article)
        res.send({ ret })
    }
    catch (err) { next(err) }
}

/** 修改 `文章` */
exports.modify = async (req, res, next) => {
    try {
        let article = new Article(req.body)
        article.modify(req.body) // 更新处理方法
        let ret = await DBArticle.update(article)
        res.send({ ret })
    } catch (err) { next(err) }
}

/** 删除 `文章` */
exports.delete = async (req, res, next) => {
    try {
        Article.prototype.checkNull(req.body.id) // id 空值校验
        let ret = await DBArticle.delete(req.body.id)
        res.send({ ret })
    } catch (err) { next(err) }
}