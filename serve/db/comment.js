const DBComment = require('../mysql/comment')
const Comment = require('../class/Comment')
const error = require('../error')

/** 搜索所有 `评论` */
exports.search = async (req, res, next) => {
    let rows = await DBComment.select()
    res.send({ data: rows })
}

/** 新添 `评论` */
exports.add = async (req, res, next) => {
    try {
        let comment = new Comment(req.body)
        comment.create()
        let ret = await DBComment.insert(comment)
        res.send({ ret })
        // res.send({})
    }
    catch (err) { next(err) }
}

/** 修改 `评论` */
exports.modify = async (req, res, next) => {
    try {
        let comment = new Comment(req.body)
        comment.modify(req.body)
        let ret = await DBComment.update(comment)
        res.send({ ret })
    } catch (err) { next(err) }
}

/** 删除 `评论` */
exports.delete = async (req, res, next) => {
    try {
        Comment.prototype.checkNull(req.body.id) // id 空值校验
        let ret = await DBComment.delete(req.body.id)
        res.send({ ret })
    } catch (err) { next(err) }
}