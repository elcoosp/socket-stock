const request = require('request-promise'),
  socketIO = require('socket.io'),
  to = require('await-to-js').to,
  { log } = require('../utils'),
  StockSymbol = require('../models/StockSymbol'),
  getChartsData = require('./getChartsData')

const emitChartsData = async socketOrIo => {
  // Await to get all the charts data, then broadcast it
  ;[e, chartsData] = await to(getChartsData())

  return e
    ? socketOrIo.emit('chartsDataError', {
        error: e
      })
    : socketOrIo.emit('chartsData', chartsData)
}

const registerAddStockSymbol = (socket, io) =>
  socket.on('addStockSymbol', async name => {
    const emitError = msg => socket.emit('addStockSymbolError', { error: msg })
    //Check if the symbol is not already registered in DB
    ;[dbError, alreadyInDB] = await to(StockSymbol.findOne({ name }))
    if (dbError) return emitError('An error occured')
    if (alreadyInDB)
      return emitError('Symbol is already in the chart')

      // Check if symbol exist in the API
    ;[symbolNotFound, data] = await to(
      request(`https://api.iextrading.com/1.0/stock/${name}/logo`)
    )
    if (symbolNotFound)
      return emitError('Symbol not found')

      // Save the symbol in db and emit the charts to everybody (io)
    ;[saveError, stockSymbol] = await to(new StockSymbol({ name }).save())
    if (saveError) return emitError('An error occured while adding this symbol')

    return emitChartsData(io)
  })

const registerRemoveStockSymbol = (socket, io) =>
  socket.on('removeStockSymbol', async name => {
    const emitError = msg =>
      socket.emit('removeStockSymbolError', { error: msg })
    ;[dbError, stockSymbol] = await to(StockSymbol.findOne({ name }).remove())

    return dbError ? emitError('An error occured') : emitChartsData(io)
  })

// Web socket
const launchSocket = server => {
  io = socketIO(server)
  io.on('connection', async socket => {
    log('green', 'Client connected to socket')
    socket.on('error', e => log('red', `SOCKET ERROR : ${e}`))

    emitChartsData(socket)

    registerAddStockSymbol(socket, io)
    registerRemoveStockSymbol(socket, io)

    socket.on('disconnect', () =>
      log('yellow', 'Client disconnected from socket')
    )
  })
}

module.exports = launchSocket
