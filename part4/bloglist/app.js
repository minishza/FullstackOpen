const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogsController = require('./controller/BlogController')
const userController = require('./controller/UserController')
const loginController = require('./controller/UserLoginController')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginController)
app.use('/api/users', userController)
app.use('/api/blogs', blogsController)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app