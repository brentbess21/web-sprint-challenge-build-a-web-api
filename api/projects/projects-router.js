// Write your "projects" router here!
const express = require('express')
const router = express.Router()

const Project = require('./projects-model')

router.get('/', async (req, res, next)=> {
    try{
        const projects = await Project.get()
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next)=> {
    try {
        const { id } = req.params
        const correctProject = await Project.get(id)
        if(!correctProject){
            res.status(404).json({
                message: "project not found"
            })
        } else {
            res.status(200).json(correctProject)
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router;