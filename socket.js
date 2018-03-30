const request = require('request-promise'),
  socketIO = require('socket.io'),
  to = require('await-to-js').to,
  _ = require('lodash'),
  mockData = require('./mockData'),
  { log, getFirstKey } = require('./utils'),
  StockSymbol = require('./models/StockSymbol')

const getChartsData = async () => {
  ;[dbError, stockSymbols] = await to(StockSymbol.find())

  if (dbError) return { error: 'Can not get charts data' }
  ;[e, chartsData] = await to(
    (() => {
      // Make a string separated by comma of the names from the retrieved stockSymbols in DB
      // Then create the url and request the batched payload
      const stockSymbolsNames = stockSymbols.map(({ name }) => name)
      const URL = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stockSymbolsNames.join()}&types=chart&range=1m`
      return request(URL)
        .then(res => JSON.parse(res))
        .then(allSymbols => {
          //Then we create an array of all dates
          const dates = getFirstKey(getFirstKey(allSymbols)).map(
            ({ date }) => date
          )
          //We iterate over the dates
          const output = dates.reduce((acc, date, dateIndex) => {
            // Creating a date point object with the date as prop
            const datePoint = {
              date
            }
            //For each symbol we add a key to the datepoint equal to the corresponding symbol data
            // The trick is that we access
            stockSymbolsNames.forEach(
              (s, i) => (datePoint[s] = allSymbols[s].chart[dateIndex])
            )
            //FInally we push the whole object in the accumulator
            acc.push(datePoint)
            return acc
          }, [])

          return output
        })
    })()
  )

  return new Promise(
    (resolve, reject) =>
      e ? reject('Can not get charts data') : resolve(chartsData)
  )
}
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

// Web socket
const launchSocket = server => {
  io = socketIO(server)
  io.on('connection', async socket => {
    log('green', 'Client connected to socket')
    socket.on('error', e => log('red', `SOCKET ERROR : ${e}`))

    emitChartsData(socket)

    registerAddStockSymbol(socket, io)

    socket.on('disconnect', () =>
      log('yellow', 'Client disconnected from socket')
    )
  })
}

module.exports = launchSocket
