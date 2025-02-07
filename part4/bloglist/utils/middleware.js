const logger = require('./logger')
const jwt = require('jsonwebtoken');

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }else if (error.name === 'ValidationError' || error.name === 'Internal Server Error') {
        return response.status(400).json({ error: error.message })
    }else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name ===  'JsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid' })
    }

    next(error)
}

const extractToken = (request, response, next) => {
    const authorization = request.get('authorization')
    if (!authorization && !authorization.startsWith('Bearer ')) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const token = authorization.replace('Bearer ', '')

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id){
        return response.status(401).json({ error: 'token invalid' })
    }

    request.token = decodedToken.id
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    extractToken
}