const assetRouter = require('express').Router()
const Asset = require('../models/asset')

assetRouter.get('/', (req, res, next) => {
  Asset.find({})
    .then(assets => res.json(assets))
    .catch(error => next(error))
})

assetRouter.get('/:id', (req, res, next) => {
  Asset.findById(req.params.id)
    .then(asset => {
      if (asset) {
        res.json(asset)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

assetRouter.post('/', (req, res, next) => {
  const { symbol, shares } = req.body
  console.log(symbol, shares)
  const asset = new Asset({ symbol, shares })
  asset
    .save()
    .then(savedAsset => {
      res.json(savedAsset)
    })
    .catch(error => next(error))
})

module.exports = assetRouter