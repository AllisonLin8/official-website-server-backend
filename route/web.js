const express = require('express')
const router = express.Router()

// 引入所有的路由模塊
const ProductRouter = require('./web/ProductRouter')
const VarietyRouter = require('./web/VarietyRouter')
const CategoryRouter = require('./web/CategoryRouter')
const NewsRouter = require('./web/NewsRouter')

// 將所有路由模塊添加到主路由
router.use('/products', ProductRouter)
router.use('/varieties', VarietyRouter)
router.use('/categories', CategoryRouter)
router.use('/newslist', NewsRouter)

module.exports = router
