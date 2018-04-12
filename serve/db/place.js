const DBPlace = require('../mysql/place')
const Place = require('../class/Place')
const error = require('../error')

/** 绑定标签 */
exports.bind = async (req, res, next) => {
    try {
        let place = new Place(req.body)
        let findPlace = await DBPlace.find(place)
        if (findPlace[0]) throw error.placeAlready // 防止重复绑定
        let ret = await DBPlace.insert(place)
        res.send({ret})
    } catch (err) { next(err) }
}

/** 移除标签 */
exports.remove = async (req, res, next) => {
    try {
        let place = new Place(req.body)
        let ret = await DBPlace.delete(place)
        res.send({ret})
    } catch (err) { next(err) }
}