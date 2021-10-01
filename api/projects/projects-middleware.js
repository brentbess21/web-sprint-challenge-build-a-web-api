// add middlewares here related to projects
const Project = require('./projects-model');


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
            res.status(404).json({
                message: "Project with that ID not found"
            })
        } else {
            res.status(200).json(possibleProject)
        }
      } catch (err) {
        next(err)
      }
  }


  module.exports = {
      logger,
      checkProjectId,
  }