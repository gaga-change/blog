/**
 * 非数据库操作中间件
 */

/** 搜索中间件 */
exports.search = (req, res, next) => {
    req.arg = {}
    // 选择项
    req.arg.select = req.query.select || ''
    // 排序
    req.arg.order = req.query.order || ''
    // 筛选
    req.arg.where = req.query.where || ''
    
    let page = parseInt(req.query.page) || 1
    let pageSize = parseInt(req.query.pageSize) || 1
    page = Math.abs(page)
    pageSize = Math.abs(pageSize)
    if (pageSize > 30) pageSize = 29
    req.arg.start = pageSize * (page - 1)
    req.arg.length = pageSize
    next()
}
/** 所有接口 中间件 */
exports.init = (req, res, next) => {
    next()
}