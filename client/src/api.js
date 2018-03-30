import openSocket from 'socket.io-client'
const socket = openSocket('/')

export const subscribeToCharts = cb => {
  socket.on('chartsData', cb)
}

export const addStockSymbol = symbol => socket.emit('addStockSymbol', symbol)
export const subscribeToAddStockSymbolError = cb =>
  socket.on('addStockSymbolError', error => cb(error))
