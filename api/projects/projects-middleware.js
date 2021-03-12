const Project = require('./projects-model')

const checkProjectId = async (req, res, next) => {
  try {
    const project = await Project.get(req.params.id)
    if (!project) {
      res.status(404).json({ message: `Project not found at ${req.params.id}` })
    } else {
      req.projectRequested = project
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkValidProject = (req, res, next) => {
if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: 'name and description are Required'})
  } else {
    next()
  }
}

module.exports = {
  checkProjectId,
  checkValidProject
}