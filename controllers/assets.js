const assetRouter = require('express').Router()
const Asset = require('../models/asset')

assetRouter.get('/', (req, res) => {
  Asset.find({}).then(assets => {
    res.json(assets)
  })
})

assetRouter.post('/', (req, res) => {
  const { symbol, shares } = req.body
  console.log(symbol, shares)
  const asset = new Asset({ symbol, shares })
  asset
    .save()
    .then(savedAsset => {
      res.json(savedAsset)
    })
})

module.exports = assetRouter