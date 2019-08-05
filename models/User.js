const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: '123454321'
    },
    FIO: {
        type: String,
        unique: true
    },
    perms: {
        type: String
    }
})

module.exports = mongoose.model('users', userSchema)