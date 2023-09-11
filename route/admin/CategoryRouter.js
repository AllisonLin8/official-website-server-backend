const CategoryRouter = require('express').Router()
const CategoryController = require('../../controllers/admin/CategoryController')

CategoryRouter.get('/adminapi/categories', CategoryController.getCategories)

module.exports = CategoryRouter
