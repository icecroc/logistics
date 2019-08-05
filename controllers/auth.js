const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({name: req.body.name})

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            const token = jwt.sign({
                name: candidate.name,
                userId: candidate._id,
                perms: candidate.perms,
                FIO: candidate.FIO
            }, keys.jwt, {expiresIn: 3600})
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            res.status(401).json({
                message: 'Пароли не совпадают'
            })
        }
    } else {
        res.status(404).json({
            message: 'Пользователь не найден'
        })
    }
}

module.exports.register = async function(req, res) {
    const candidate = User.findOne({name: req.body.name})

    if (candidate) {
        res.status(409).json({
            message: 'Логин уже существует'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            name: req.body.name,
            password: bcrypt.hashSync(password, salt),
            FIO: req.body.FIO,
            perms: req.body.perms
        })
    try {
        await user.save()
        res.status(201).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
    }

    
}