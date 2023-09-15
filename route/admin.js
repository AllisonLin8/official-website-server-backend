const express = require('express')
const router = express.Router()

// 引入所有的路由模塊
const CategoryRouter = require('./admin/CategoryRouter')
const NewsRouter = require('./admin/NewsRouter')
const RoleRouter = require('./admin/RoleRouter')
const UserRouter = require('./admin/UserRouter')

// 將所有路由模塊添加到主路由
router.use(CategoryRouter)
router.use(NewsRouter)
router.use(RoleRouter)
router.use(UserRouter)

module.exports = router
