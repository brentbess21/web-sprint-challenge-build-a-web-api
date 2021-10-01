// add middlewares here related to actions
const Action = require('./actions-model')
const yup = require('yup')

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

const actionsSchema = yup.object().shape({
    notes: yup.string().required("Notes are required"),
    description: yup.string().required("A description is required"),
    project_id: yup.number().required("The project ID is required"),
    completed: yup.bool().required('Completed status is required')
})

async function actionValidation (req, res, next) {
    try {
        const validated = await actionsSchema.validate(
          req.body,
          { strict: false, stripUnknown: true }
        )
        req.body = validated
        next()
      } catch (err) {
        next({ status: 400, message: err.message })
      }
}

module.exports = {
    checkActionId,
    actionValidation
}