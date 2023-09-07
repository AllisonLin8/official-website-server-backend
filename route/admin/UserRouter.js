const UserRouter = require('express').Router()
const UserController = require('../../controllers/admin/UserController')

const upload = require('../../middleware/multer')
const { validate } = require('../../middleware/validator')
const { authenticatedRoot } = require('../../middleware/auth')

const {
  loginDataHelper,
  signUpDataHelper,
  modifyPersonalInfoHelper,
  deleteUserHelper,
  getUserHelper,
} = require('../../helpers/validator-helper')

// ! 測試token刷新用
// UserRouter.get('/adminapi/users/home', authenticatedRoot, (req, res) => {
//   console.log('這邊有接到pass的req.user嗎：', req.user)
//   res.send({ msg: '點擊成功！' })
// })

UserRouter.post(
  '/adminapi/users/login',
  validate(loginDataHelper),
  UserController.login
)

UserRouter.post(
  '/adminapi/users/signup',
  validate(signUpDataHelper),
  UserController.signUp
)

UserRouter.post(
  '/adminapi/users/upload',
  upload.single('file'),
  validate(modifyPersonalInfoHelper),
  UserController.upload
)

UserRouter.delete(
  '/adminapi/users/:userId',
  authenticatedRoot,
  validate(deleteUserHelper),
  UserController.deleteUser
)

UserRouter.get(
  '/adminapi/users/:userId',
  validate(getUserHelper),
  UserController.getUser
)

UserRouter.get('/adminapi/users', UserController.getUsers)

module.exports = UserRouter
