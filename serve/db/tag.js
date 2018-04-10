const DBTag = require('../mysql/tag')
const Tag = require('../class/Tag')
const error = require('../error')

/** 搜索所有 `标签` */
exports.search = async (req, res, next) => {
    let rows = await DBTag.select()
    res.send({ data: rows })
}

/** 新填 `标签` */
exports.add = async (req, res, next) => {
    try {
        let tag = new Tag(req.body)
        let ret = await DBTag.insert(tag)
        res.send({ret})
    }
    catch (err) { next(err) }
}

/** 修改 `标签` */
exports.modify = async (req, res, next) => {
    try {
        let tag = new Tag(req.body)
        tag.checkIdAndSave(req.body.id) // id 空值校验，并保存
        let ret = await DBTag.update(tag)
        res.send({ret})
    } catch (err) {next(err)}
}

/** 删除 `标签` */
exports.delete = async (req, res, next) => {
    try {
        Tag.prototype.checkNull(req.body.id) // id 空值校验
        let ret = await DBTag.delete(req.body.id)
        res.send({ret})
    } catch(err) {next(err)}
}