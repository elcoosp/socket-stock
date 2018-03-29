import openSocket from 'socket.io-client'
const socket = openSocket('/')

export const subscribeToCharts = cb =>
  socket.on('chartsData', data => cb(null, data))
