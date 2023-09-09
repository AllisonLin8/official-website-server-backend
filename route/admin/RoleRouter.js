const RoleRouter = require('express').Router()
const RoleController = require('../../controllers/admin/RoleController')

RoleRouter.get('/adminapi/roles', RoleController.getRoles)

module.exports = RoleRouter
