exports.search = (req, res, next) => {
    let page = parseInt(req.query.page) || 1
    let pageSize = parseInt(req.query.pageSize) || 1
    page = Math.abs(page)
    pageSize = Math.abs(pageSize)
    if (pageSize > 30) pageSize = 29
    req.search = {
        start: pageSize * (page - 1),
        length: pageSize
    }
    next()
}