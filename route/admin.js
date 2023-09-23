const express = require('express')
const router = express.Router()

// 引入所有的路由模塊
const ProductRouter = require('./admin/ProductRouter')
const VarietyRouter = require('./admin/VarietyRouter')
const CategoryRouter = require('./admin/CategoryRouter')
const NewsRouter = require('./admin/NewsRouter')
const RoleRouter = require('./admin/RoleRouter')
const UserRouter = require('./admin/UserRouter')

// 將所有路由模塊添加到主路由
router.use('/products', ProductRouter)
router.use('/varieties', VarietyRouter)
router.use('/categories', CategoryRouter)
router.use('/newslist', NewsRouter)
router.use('/roles', RoleRouter)
router.use('/users', UserRouter)

module.exports = router
