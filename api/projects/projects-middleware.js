// add middlewares here related to projects
const yup = require('yup')
const Project = require('./projects-model');

//yup schema for validation
const projectSchema = yup.object().shape({
    name: yup.string().required("name is required"),
    description: yup.string().required('description is required'),
    completed: yup.bool().required('completed status is required')  
})

// middleware functions 
function logger (req, res, next) {
    const currentTime = Date().toLocaleString()
    console.log(`There was a ${req.method} request to ${req.originalUrl} at ${currentTime}`)
    next() 
}

async function checkProjectId (req, res, next) {
    try {
    const { id } = req.params
    const possibleProject = await Project.get(id)
    if (!possibleProject) {
        next({status: 404, message: "Project with that ID not found"})
    } else {
        req.project = possibleProject
        next()
    }
    } catch (err) {
    next(err)
    }
}

function errorHandling (err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message
    })
}

async function projectValidation (req, res, next) {
    try {
        const validated = await projectSchema.validate(
          req.body, { strict: false, stripUnknown: true }
        )
        req.body = validated
        next()
    } catch (err) {
        next({ status: 400, message: err.message })
    }
}

module.exports = {
      logger,
      checkProjectId,
      errorHandling,
      projectValidation
 }