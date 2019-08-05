const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    zip: {
        type: String
    },
    carType: {
        type: String
    },
    weight: {
        type: String
    },
    actualWeight: {
        type: String
    },
    gabs: {
        type: String
    },
    actualGabs: {
        type: String
    }
})

module.exports = mongoose.model('items', itemSchema)