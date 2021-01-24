require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
  symbol: String,
  shares: Number
})

const Asset = mongoose.model('Asset', assetSchema)

const mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

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

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))