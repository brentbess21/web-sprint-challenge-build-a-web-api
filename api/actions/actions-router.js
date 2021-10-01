const express = require('express');
const { checkActionId, actionValidation } = require('./actions-middlware')
const Action = require('./actions-model');
const router = express.Router();

//GET endpoints
router.get('/', async (req, res, next)=> {
    try{
        const actions = await Action.get()
        res.status(200).json(actions)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkActionId, async (req, res)=> {
    res.status(200).json(req.action)
})

//POST endpoint
router.post('/', actionValidation, async (req, res, next)=> {
    try{
        const newAction = await Action.insert(req.body)
        res.status(200).json(newAction)
    } catch(err) {
        next(err)
    }
})

//PUT endpoint
router.put('/:id', checkActionId, actionValidation, async (req, res, next)=> {
    try{
        const { id } = req.params;
        const updatedAction = await Action.update(id, req.body)
        res.status(200).json(updatedAction)
    } catch (err) {
        next(err)
    }
})

//DELETE endpoint 
router.delete('/:id', checkActionId, async (req, res, next)=> {
    try {
        const { id } = req.params;
        const deletedAction = await Action.remove(id);
        res.status(200).json(deletedAction);
    } catch (err) {
        next(err)
    }
})

module.exports = router;