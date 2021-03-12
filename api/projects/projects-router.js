// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const { checkProjectId, checkValidProject } = require('./projects-middleware')
const router = express.Router()

/**** BASE ROUTE /api/projects ****/
// [GET] / (Return array of projects)
router.get('/', async (req, res, next) =>{
  try {
    const projects = await Project.get()
    res.json(projects)
  } catch (err) {
    next(err)
  }
})

// [GET] /:id (Return project with given id)
router.get('/:id', checkProjectId, (req, res) => {
  res.json(req.projectRequested)
})

// [GET] /:id/actions (Returns actions for given project)
router.get('/:id/actions', checkProjectId, async (req, res, next) => {
  try {
    const actions = await Project.getProjectActions(req.params.id)
    res.json(actions)
  } catch (err) {
    next(err)
  }
})

// [POST] / (Creates new project, returns new project)
router.post('/', checkValidProject, async (req, res, next) => {
  try {
    const newProject = await Project.insert(req.body)
    res.json(newProject)
  } catch (err) {
    next(err)
  }
})

// [PUT] /:id (Updates project with given id, returns updated project)
router.put('/:id', checkProjectId, checkValidProject, async (req, res, next) => {
  const { id } = req.params
  try {
    const updatedProject = await Project.update(id, req.body)
    res.json(updatedProject)
  } catch (err) {
    next(err)
  }
})

// [DELETE] /:id (Deletes project at given id, no response)
router.delete('/:id', checkProjectId, async (req, res, next) => {
  try {
    await Project.remove(req.params.id)
    res.json()
  } catch (err) {
    next(err)
  }
})

// Error Catching
router.use((err, req, res, next) => { // eslint-disable-line
  res.status.json({
    custom: 'Something went wrong in the projects router',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router