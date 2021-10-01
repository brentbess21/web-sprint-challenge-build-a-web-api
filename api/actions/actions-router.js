// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const Action = require('./actions-model');
const { checkActionId } = require('./actions-middlware')

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


module.exports = router;