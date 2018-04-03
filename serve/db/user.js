const user = require('../mysql/user')

exports.test = (req, res) => {
    res.send('gaga')
}

exports.search = (req, res, next) => {
    user.get().then(rows => {
        res.send(rows)
    })
}