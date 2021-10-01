// Write your "projects" router here!
const express = require('express')
const router = express.Router()

const Project = require('./projects-model')
const { checkProjectId } = require('./projects-middleware')

router.get('/', async (req, res, next)=> {
    try{
        const projects = await Project.get()
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkProjectId, async (req, res)=> {
    res.status(200).json(req.project)
})

module.exports = router;