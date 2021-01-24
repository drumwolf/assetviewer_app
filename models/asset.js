const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  shares: Number
})
assetSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Asset', assetSchema)