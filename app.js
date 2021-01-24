const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const assetRouter = require('./controllers/assets')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const app = express()

console.log('connecting to ', config.MONGO_URL)
mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB: ', error))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/api/assets', assetRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app