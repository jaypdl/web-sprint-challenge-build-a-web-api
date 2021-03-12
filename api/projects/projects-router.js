// Write your "projects" router here!
const express = require('express')

const router = express.Router()

/**** BASE ROUTE /api/projects ****/
// [GET] / (Return array of projects)

// [GET] /:id (Return project with given id)

// [GET] /:id/actions (Returns actions for given project)

// [POST] / (Creates new project, returns new project)

// [PUT] /:id (Updates project with given id, returns updated project)

// [DELETE] /:id (Deletes project at given id, no response)

// Error Catching
router.use((err, req, res, next) => {
  res.status.json({
    custom: 'Something went wrong in the projects router',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router