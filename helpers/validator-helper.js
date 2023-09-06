const { body } = require('express-validator')
const { User } = require('../db/models')

const loginDataHelper = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('請填入 Email！')
    .isEmail()
    .withMessage('Email 格式不符！'),
  body('password').trim().notEmpty().withMessage('請填入 Password！'),
]

const signUpDataHelper = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('請填入名稱！')
    .isLength({ min: 3, max: 20 })
    .withMessage('名稱至少 3 個字，至多 20 個字！'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('請填入 Email！')
    .isEmail()
    .withMessage('Email 格式不符！')
    .custom(async value => {
      const user = await User.findOne({ where: { email: value } })
      if (user) throw new Error('這個 Email 已經註冊過了！')
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('請填入 Password！')
    .isLength({ min: 8 })
    .withMessage('Password 至少 8 個字！'),
  body('confirmPassword')
    .trim()
    .notEmpty()
    .withMessage('請填入 confirmPassword！')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password 和 confirmPassword 不相符！')
      } else {
        return true
      }
    }),
  body('roleId').optional(),
]

const modifyPersonalInfo = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('請填入名稱！')
    .isLength({ min: 3, max: 20 })
    .withMessage('名稱至少 3 個字，至多 20 個字！'),
  body('intro')
    .trim()
    .isLength({ min: 0, max: 200 })
    .withMessage('自介最長 200 個字！'),
]
module.exports = {
  loginDataHelper,
  signUpDataHelper,
  modifyPersonalInfo,
}
