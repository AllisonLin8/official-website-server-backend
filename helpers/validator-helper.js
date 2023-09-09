const { Op } = require('sequelize')
const { body, param } = require('express-validator')

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

const modifyPersonalInfoHelper = [
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

const deleteUserHelper = [
  param('userId').notEmpty().withMessage('使用者ID不可為空！'),
]

const getUserHelper = [
  param('userId').notEmpty().withMessage('使用者ID不可為空！'),
]

const putUserHelper = [
  param('userId')
    .notEmpty()
    .withMessage('使用者ID不可為空！')
    .custom(async value => {
      const root = await User.findOne({
        where: { name: 'root' },
        attributes: ['id'],
        raw: true,
      })
      // name 為 root 的使用者為superuser 有權限去改其他使用者的資料，且 root 永遠不會被其他使用者更改
      if (Number(value) === root.id) {
        throw new Error('不可變更 root 的資料！')
      } else {
        return true
      }
    }),
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
    .custom(async (value, { req }) => {
      const allUserEmail = await User.findAll({
        attributes: ['email'],
        where: {
          id: {
            [Op.ne]: req.params.userId,
          },
        },
        raw: true,
      })
      const isEmailExists = allUserEmail.some(user => user.email === value)
      if (isEmailExists) {
        throw new Error('這個 Email 已經被使用了！')
      } else {
        return true
      }
    }),
  body('password')
    .optional()
    .trim()
    .custom(value => {
      if (value && value.length < 8) {
        return false
      } else {
        return true
      }
    })
    .withMessage('Password 至少 8 個字！'),
  body('confirmPassword')
    .if(body('password').exists())
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password 和 confirmPassword 不相符！')
      } else {
        return true
      }
    }),
  body('roleId').optional(),
]

module.exports = {
  loginDataHelper,
  signUpDataHelper,
  modifyPersonalInfoHelper,
  deleteUserHelper,
  getUserHelper,
  putUserHelper,
}
