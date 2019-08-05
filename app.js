const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')

const authRoutes = require('./routes/auth')
const itemRoutes = require('./routes/item')

const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/item', itemRoutes)


module.exports = app