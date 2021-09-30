const express = require('express');
const server = express();


const Project = require('./projects/projects-model')
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.get('/api/projects', async (req, res, next)=> {
    try{
        const projects = await Project.get()
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
})

module.exports = server;
