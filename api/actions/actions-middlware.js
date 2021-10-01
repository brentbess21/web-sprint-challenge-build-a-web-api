// add middlewares here related to actions
const Action = require('./actions-model')

async function checkActionId (req, res, next) {
    try {
      const { id } = req.params
      const possibleAction = await Action.get(id)
      if (!possibleAction) {
          next({status: 404, message: "Action with that ID not found"})
      } else {
          req.action = possibleAction
          next()
      }
    } catch (err) {
      next(err)
    }
}


module.exports = {
    checkActionId
}