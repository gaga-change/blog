const DBClassify = require('../mysql/classify')
const Classify = require('../class/Classify')
const error = require('../error')

/** 搜索所有 `分类目录` */
exports.search = async (req, res, next) => {
    let rows = await DBClassify.select()
    res.send({ data: rows })
}

/** 新添 `分类目录` */
exports.add = async (req, res, next) => {
    try {
        let classify = new Classify(req.body)
        let ret = await DBClassify.insert(classify)
        res.send({ret})
    }
    catch (err) { next(err) }
}

/** 修改 `分类目录` */
exports.modify = async (req, res, next) => {
    try {
        let classify = new Classify(req.body)
        classify.modify(req.body)
        let ret = await DBClassify.update(classify)
        res.send({ret})
    } catch (err) {next(err)}
}

/** 删除 `分类目录` */
exports.delete = async (req, res, next) => {
    try {
        Classify.prototype.checkNull(req.body.id) // id 空值校验
        let ret = await DBClassify.delete(req.body.id)
        res.send({ret})
    } catch(err) {next(err)}
}

