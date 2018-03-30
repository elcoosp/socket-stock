const request = require('request-promise'),
  socketIO = require('socket.io'),
  to = require('await-to-js').to,
  mockData = require('./mockData'),
  { log } = require('./utils'),
  StockSymbol = require('./models/StockSymbol')

const getChartsData = async () => {
  ;[dbError, stockSymbols] = await to(StockSymbol.find())

  // map all symbols to an array of url request
  // wait for all to resolve or reject then send back the error/data
  if (dbError) return { error: 'Can not get charts data' }
  ;[e, chartsData] = await to(
    Promise.all([...stockSymbols.map(({ url }) => request(url))])
  )

  return e ? { error: 'Can not get charts data' } : chartsData
}

const emitChartsData = async socket => {
  // Await to get all the charts data, then broadcast it
  ;[e, chartsData] = await to(getChartsData())
  return e
    ? { error: 'An error occured while retrieving charts data' }
    : socket.emit('chartsData', chartsData)
}

const registerAddStockSymbol = socket =>
  socket.on('addStockSymbol', async name => {
    const emitError = msg => socket.emit('addStockSymbolError', { error: msg })
    //Check if the symbol is not already registered in DB
    ;[dbError, alreadyInDB] = await to(StockSymbol.findOne({ name }))

    if (dbError || alreadyInDB)
      return emitError('Symbol is already here or an error occured')

      // Check if symbol exist in the API
    ;[symbolNotFound, data] = await to(
      request(`https://api.iextrading.com/1.0/stock/${name}/logo`)
    )
    if (symbolNotFound)
      return emitError('Symbol not found')

      // Save the symbol in db and emit all the charts
    ;[saveError, stockSymbol] = await to(new StockSymbol({ name }).save())
    if (saveError) return emitError('An error occured while adding this symbol')

    return emitChartsData(socket)
  })

// Web socket
const launchSocket = server => {
  io = socketIO(server)
  io.on('connection', async socket => {
    log('green', 'Client connected to socket')
    socket.on('error', e => log('red', `SOCKET ERROR : ${e}`))

    emitChartsData(socket)

    registerAddStockSymbol(socket)

    socket.on('disconnect', () =>
      log('yellow', 'Client disconnected from socket')
    )
  })
}

module.exports = launchSocket
