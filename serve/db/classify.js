const DBClassify = require('../mysql/classify')
const Classify = require('../class/Classify')
const error = require('../error')

/** 搜索所有 `分类目录` */
exports.search = async (req, res, next) => {
    let rows = await DBClassify.select()
    res.send({ data: rows })
}

/** 新填 `分类目录` */
exports.add = async (req, res, next) => {
    try {
        let classify = new Classify(req.body)
        await DBClassify.insert(classify)
        res.send({})
    }
    catch (err) { next(err) }
}