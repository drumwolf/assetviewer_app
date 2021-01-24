const mongoose = require('mongoose')

const url = process.env.MONGO_URL
console.log('connecting to ', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDB: ', error))

const assetSchema = new mongoose.Schema({
  symbol: String,
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