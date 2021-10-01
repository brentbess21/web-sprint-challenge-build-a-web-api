// add middlewares here related to projects



function logger (req, res, next) {
    const currentTime = Date().toLocaleString()
    console.log(`There was a ${req.method} request to ${req.originalUrl} at ${currentTime}`)
    next() 
  }


  module.exports = {
      logger,
  }