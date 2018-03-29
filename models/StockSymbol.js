const mongoose = require('mongoose'),
  { Schema } = mongoose

const StockSymbolSchema = new Schema({
  name: String
})

StockSymbolSchema.virtual('url').get(function() {
  return `https://api.iextrading.com/1.0/stock/${this.name}/chart`
})
module.exports = mongoose.model('StockSymbol', StockSymbolSchema)
