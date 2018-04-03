const user = require('../mysql/user')

exports.test = (req, res) => {
    res.send('gaga')
}

exports.search = (req, res, next) => {
    user.search({
        ...req.search
    }).then(rows => {
        res.send({success: true, data: rows, query: req.query})
    })
}