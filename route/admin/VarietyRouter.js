const VarietyRouter = require('express').Router()

const VarietyController = require('../../controllers/admin/VarietyController')

VarietyRouter.get('/varieties', VarietyController.getVarieties)

module.exports = VarietyRouter
