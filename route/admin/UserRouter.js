const UserRouter = require("express").Router()
const UserController = require("../../controllers/admin/UserController")

UserRouter.post("/adminapi/user/login", UserController.login)

// 測試用↓
// UserRouter.get('/adminapi/user/home', (req, res) => {
//   res.send({ 'GET ok': 1 })
// })

module.exports = UserRouter
