'use strict'

// Global modules require and dotenv initialization
const express = require('express'),
  dotenv = require('dotenv').config(),
  socketIO = require('socket.io'),
  path = require('path'),
  mongoose = require('mongoose'),
  helmet = require('helmet'),
  mongoSanitize = require('express-mongo-sanitize')

// App modules and variables
const { emitChartsData, addStockSymbol } = require('./handlers'),
  mockData = require('./mockData'),
  { log } = require('./utils'),
  { PORT = 5000, MONGODB_URI } = process.env,
  INDEX = path.join(__dirname, 'client/build/index.html'),
  PUBLIC_FOLDER = path.join(__dirname, 'client/build')

// DB conneciton
mongoose.set('debug', true)
mongoose
  .connect(MONGODB_URI)
  .then(connection => log('green', 'Connected to DB'))
  .catch(e => log('red', `DB ERROR: ${e}`))

// App setup
const app = express(),
  server = require('http').createServer(app),
  io = socketIO(server)

app
  .use(express.static(PUBLIC_FOLDER))
  .get('*', (req, res) => res.sendFile(INDEX))

// Web socket
io.on('connection', socket => {
  log('green', 'Client connected to socket')
  socket.on('error', e => log('red', `SOCKET ERROR : ${e}`))
  socket.on('addStockSymbol', name => addStockSymbol(socket, name))

  socket.emit('chartsData', emitChartsData())

  socket.on('disconnect', () =>
    log('yellow', 'Client disconnected from socket')
  )
})

server.listen(PORT, () => console.log(`Listening on ${PORT}`))
