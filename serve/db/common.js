exports.search = (req, res, next) => {
    let page = parseInt(req.query.page) || 1
    let pageSize = parseInt(req.query.pageSize) || 1
    page = Math.abs(page)
    pageSize = Math.abs(pageSize)
    if (pageSize > 30) pageSize = 29
    req.arg.start = pageSize * (page - 1)
    req.arg.length = pageSize
    next()
}
exports.init = (req, res, next) => {
    req.arg = {}
    req.arg.select = req.query.select || '*'
    next()
}