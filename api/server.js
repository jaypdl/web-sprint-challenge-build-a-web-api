// Complete your server here!
// Do NOT `server.listen()` inside this file!
const express = require('express');
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')


const server = express();
server.use(express.json())

// Routes
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
  res.send('<h1>The server is running</h1>')
})

// Catch all
server.use('*', (req, res) => {
  res.status(404).json({ message: `Sorry, this is not a valid location for a ${req.method} request`})
})


module.exports = server;
