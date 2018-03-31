import openSocket from 'socket.io-client'
const socket = openSocket('/')

export const subscribeToCharts = cb => socket.on('chartsData', cb)

export const addStockSymbol = name => socket.emit('addStockSymbol', name)
export const subscribeToChartsDataError = cb =>
  socket.on('chartsDataError', error => cb(error))

export const subscribeToAddStockSymbolError = cb =>
  socket.on('addStockSymbolError', error => cb(error))

export const subscribeToRemoveStockSymbolError = cb =>
  socket.on('removeStockSymbolError', error => cb(error))

export const removeStockSymbol = name => socket.emit('removeStockSymbol', name)
