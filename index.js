'use strict'

// Global modules require and dotenv initialization
const express = require('express'),
  dotenv = require('dotenv').config(),
  socketIO = require('socket.io'),
  path = require('path'),
  { log } = require('./utils'),
  mockData = require('./mockData')

// App setup
const { PORT = 5000 } = process.env,
  INDEX = path.join(__dirname, 'client/build/index.html'),
  PUBLIC_FOLDER = path.join(__dirname, 'client/build')

const server = express()
  .use(express.static(PUBLIC_FOLDER))
  .get('*', (req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

// Web socket
const io = socketIO(server)

io.on('connection', socket => {
  log('green', 'Client connected to socket')
  socket.on('error', e => log('red', `SOCKET ERROR : ${e}`))

  socket.emit('chartsData', mockData)

  socket.on('disconnect', () =>
    log('yellow', 'Client disconnected from socket')
  )
})
