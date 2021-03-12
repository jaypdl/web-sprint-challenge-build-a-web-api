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

// Catch all
server.use('*', (req, res) => {
  res.send('<h1>The server is running</h1>')
})

module.exports = server;
