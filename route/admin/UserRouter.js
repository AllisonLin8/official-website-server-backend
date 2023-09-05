const UserRouter = require('express').Router()
const UserController = require('../../controllers/admin/UserController')

const upload = require('../../middleware/multer')

// ! 測試token刷新用
// const { authenticatedRoot } = require('../../middleware/auth')
// UserRouter.get('/adminapi/users/home', authenticatedRoot, (req, res) => {
//   console.log('這邊有接到pass的req.user嗎：', req.user)
//   res.send({ msg: '點擊成功！' })
// })

UserRouter.post('/adminapi/users/login', UserController.login)

UserRouter.post(
  '/adminapi/users/upload',
  upload.single('file'),
  UserController.upload
)

module.exports = UserRouter
