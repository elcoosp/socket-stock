'use strict'

// Global modules require and dotenv initialization
const express = require('express'),
  dotenv = require('dotenv').config(),
  path = require('path'),
  mongoose = require('mongoose'),
  helmet = require('helmet'),
  mongoSanitize = require('express-mongo-sanitize')

// App modules and variables
const launchSocket = require('./socket'),
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
  server = require('http').createServer(app)

app
  .use(express.static(PUBLIC_FOLDER))
  .get('*', (req, res) => res.sendFile(INDEX))

launchSocket(server)

server.listen(PORT, () => console.log(`Listening on ${PORT}`))
