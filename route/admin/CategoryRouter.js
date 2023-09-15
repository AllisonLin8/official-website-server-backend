const CategoryRouter = require('express').Router()

const CategoryController = require('../../controllers/admin/CategoryController')

CategoryRouter.get('/categories', CategoryController.getCategories)

module.exports = CategoryRouter
