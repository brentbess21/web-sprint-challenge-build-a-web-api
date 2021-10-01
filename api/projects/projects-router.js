const express = require('express')
const { checkProjectId, projectValidation } = require('./projects-middleware')
const Project = require('./projects-model')
const router = express.Router()

//GET endpoints
router.get('/', async (req, res, next)=> {
    try{
        const projects = await Project.get()
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkProjectId, (req, res)=> {
    res.status(200).json(req.project)
})

//POST endpoint
router.post('/', projectValidation, async (req, res, next)=> {
    try {
        const newProject = await Project.insert(req.body)
        res.status(201).json(newProject)
        
    } catch (err){
        next(err)
    }
})

//PUT endpoint 
router.put('/:id', checkProjectId, projectValidation, async (req, res, next)=> {
    try{
        const { id } = req.params;
        const updatedProject = await Project.update(id, req.body);
        res.status(200).json(updatedProject)
        
    } catch (err) {
        next(err)
    }
})

//DELETE endpoint
router.delete('/:id', checkProjectId, async (req, res, next)=> {
    try {
        const { id } = req.params;
        const deletedProject = await Project.remove(id);
        res.status(200).json(deletedProject);
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', checkProjectId, async (req, res, next)=> {
    try {
        const { id } = req.params;
        const projectActions = await Project.getProjectActions(id);
        res.status(200).json(projectActions);
    } catch (err) {
        next(err)
    }
})

module.exports = router;