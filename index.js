const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

const assetSchema = new mongoose.Schema({
  symbol: String,
  shares: Number
})

const Asset = mongoose.model('Asset', assetSchema)

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

app.get('/api/assets', (req, res) => {
  Asset.find({}).then(assets => {
    res.json(assets)
  })
})

app.post('/api/assets', (req, res) => {
  const asset = new Asset(req.body)
  asset
    .save()
    .then(savedAsset => {
      res.json(savedAsset)
    })
})

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`))