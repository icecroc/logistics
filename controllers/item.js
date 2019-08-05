const Item = require('../models/Item')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        const items = await Item.find({})
        res.status(200).json(items)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    try {
        const item = await new Item({
            name: req.body.name,
            number: req.body.number,
            phone: req.body.phone
        }).save()
        res.status(201).json(item)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        const item = await Item.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
            )
        res.status(200).json(item)
    } catch (e) {
        errorHandler(res, e)
    }
}