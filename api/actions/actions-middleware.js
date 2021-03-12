const Action = require('./actions-model')

const checkActionId = async (req, res, next) => {
  try {
    const action = await Action.get(req.params.id)
    if (!action) {
      res.status(404).json({ message: `Action not found at ${req.params.id}` })
    } else {
      req.actionRequested = action
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkValidAction = (req, res, next) => {
if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({ message: 'project_id, description, and notes are Required'})
  } else {
    next()
  }
}

module.exports = {
  checkActionId, 
  checkValidAction
}