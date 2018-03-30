const mongoose = require('mongoose'),
  { Schema } = mongoose

const StockSymbolSchema = new Schema({
  name: {
    type: String,
    uppercase: true
  }
})

module.exports = mongoose.model('StockSymbol', StockSymbolSchema)
