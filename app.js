const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const assetRouter = require('./controllers/assets')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

logger.info('connecting to ', config.MONGO_URL)
mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => logger.info('connected to MongoDB'))
  .catch(error => logger.error('error connecting to MongoDB: ', error))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/assets', assetRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app