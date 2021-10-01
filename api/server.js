const express = require('express');
const server = express();

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
const { logger, errorHandling } = require('./projects/projects-middleware');

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());

server.use('/api/projects', logger, projectsRouter);
server.use('/api/actions', logger, actionsRouter);


server.use(errorHandling);


module.exports = server;
