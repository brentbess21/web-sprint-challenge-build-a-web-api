// Write your "projects" router here!
const express = require('express')
const router = express.Router()

const Project = require('./projects-model')
const { checkProjectId } = require('./projects-middleware')

//GET endpoints
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

//POST endpoint

router.post('/', async (req, res, next)=> {
    try {
        const { name, description } = req.body;
        const newProject = await Project.insert(req.body)

        if(name || description) {
            res.status(201).json(newProject)
            
        } else {
            res.status(400).json({
                message: "Please provide a name and description"
            })
        }
    } catch (err){
        next(err)
    }
})

module.exports = router;