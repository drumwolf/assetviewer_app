const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const Asset = require('./models/asset')

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