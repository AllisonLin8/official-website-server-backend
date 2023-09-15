const UserRouter = require('express').Router()

const UserController = require('../../controllers/admin/UserController')

const upload = require('../../middleware/multer')
const { validate } = require('../../middleware/validator')
const { authenticatedRoot } = require('../../middleware/auth')

const { userHelper } = require('../../helpers/validator-helper')

// ! 測試token刷新用
// UserRouter.get('/users/home', authenticatedRoot, (req, res) => {
//   console.log('這邊有接到pass的req.user嗎：', req.user)
//   res.send({ msg: '點擊成功！' })
// })

UserRouter.put(
  '/users/edit/:userId',
  authenticatedRoot,
  validate(userHelper.putUserHelper),
  UserController.putUser
)

UserRouter.post(
  '/users/login',
  validate(userHelper.loginHelper),
  UserController.login
)

UserRouter.post(
  '/users/signup',
  validate(userHelper.signUpHelper),
  UserController.signUp
)

UserRouter.post(
  '/users/upload',
  upload.single('file'),
  validate(userHelper.uploadUserHelper),
  UserController.upload
)

UserRouter.delete(
  '/users/:userId',
  authenticatedRoot,
  validate(userHelper.deleteUserHelper),
  UserController.deleteUser
)

UserRouter.get(
  '/users/:userId',
  validate(userHelper.getUserHelper),
  UserController.getUser
)

UserRouter.get('/users', UserController.getUsers)

module.exports = UserRouter
