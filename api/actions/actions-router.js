// Write your "actions" router here!
const express = require('express')
const Action = require('./actions-model')
const { checkActionId, checkValidAction } = require('./actions-middleware')
const router = express.Router()

/**** BASE ROUTE /api/actions ****/
// [GET] / (Return array of actions)
router.get('/', async (req, res, next) => {
  try {
    const actions = await Action.get()
    res.json(actions)
  } catch (err) {
    next(err)
  }
})

// [GET] /:id (Return action with given id)
router.get('/:id', checkActionId, (req, res) => {
  res.json(req.actionRequested)
})

// [POST] / (Creates new action, returns new action)
router.post('/', checkValidAction, async (req, res, next) => {
  try {
    const newAction = await Action.insert(req.body)
    res.status(201).json(newAction)
  } catch (err) {
    next(err)
  }
})

// [PUT] /:id (Updates action with given id, returns updated action)
router.put('/:id', checkActionId, checkValidAction, async (req, res, next) => {
  const { id } = req.params
  try {
    const updatedAction = await Action.update(id, req.body)
    res.json(updatedAction)
  } catch (err) {
    next(err)
  }
})

// [DELETE] /:id (Deletes action at given id, no response)
router.delete('/:id', checkActionId, async (req, res, next) => {
  try {
    await Action.remove(req.params.id)
    res.json()
  } catch (err) {
    next(err)
  }
})

// Error Catching
router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    custom: 'Something went wrong in the actions router',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router