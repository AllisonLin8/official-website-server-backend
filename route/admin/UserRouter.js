const UserRouter = require('express').Router()
const UserController = require('../../controllers/admin/UserController')

const upload = require('../../middleware/multer')

// ! 測試token刷新用
// UserRouter.get('/adminapi/users/home', (req, res) => {
//   res.send({ ok: 1 })
// })

UserRouter.post('/adminapi/users/login', UserController.login)

UserRouter.post(
  '/adminapi/users/upload',
  upload.single('file'),
  UserController.upload
)

module.exports = UserRouter
