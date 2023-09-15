const { Op } = require('sequelize')
const { body, param } = require('express-validator')

const { User } = require('../db/models')

const userHelper = {
  loginHelper: [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('請填入 Email！')
      .isEmail()
      .withMessage('Email 格式不符！'),
    body('password').trim().notEmpty().withMessage('請填入 Password！'),
  ],
  signUpHelper: [
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
  ],
  uploadUserHelper: [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('請填入名稱！')
      .isLength({ min: 3, max: 20 })
      .withMessage('名稱至少 3 個字，至多 20 個字！')
      .custom(async (value, { req }) => {
        const root = await User.findOne({ where: { name: 'root' }, raw: true })
        if (req.user.id === root.id && value !== root.name)
          throw new Error('不可變更 root 的名稱！')
      }),
    body('intro')
      .trim()
      .isLength({ min: 0, max: 200 })
      .withMessage('自介最長 200 個字！'),
  ],
  deleteUserHelper: [
    param('userId').notEmpty().withMessage('使用者ID不可為空！'),
  ],
  getUserHelper: [param('userId').notEmpty().withMessage('使用者ID不可為空！')],
  putUserHelper: [
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
  ],
}
const newsHelper = {
  postNewsHelper: [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('請填入標題！')
      .isLength({ min: 3 })
      .withMessage('標題至少 3 個字！'),
    body('content').trim().notEmpty().withMessage('請填入內容！'),
    body('categoryId').trim().notEmpty().withMessage('請填入類別！'),
  ],
  patchNewsHelper: [param('newsId').notEmpty().withMessage('新聞ID不可為空！')],
  getNewsHelper: [param('newsId').notEmpty().withMessage('新聞ID不可為空！')],
  deleteNewsHelper: [
    param('newsId').notEmpty().withMessage('新聞ID不可為空！'),
  ],
  putNewsHelper: [
    body('id').trim().notEmpty().withMessage('新聞ID不可為空！'),
    body('title')
      .trim()
      .notEmpty()
      .withMessage('請填入標題！')
      .isLength({ min: 3 })
      .withMessage('標題至少 3 個字！'),
    body('content')
      .trim()
      .notEmpty()
      .withMessage('請填入內容！')
      .custom(async value => {
        if (value === '<p><br></p>') throw new Error('請填入內容！')
      }),
    body('categoryId').trim().notEmpty().withMessage('請填入類別！'),
    body('isPublished').trim().notEmpty().withMessage('請填入是否發佈！'),
    body('createdAt').trim().notEmpty().withMessage('請填入初稿日期！'),
  ],
}

module.exports = {
  userHelper,
  newsHelper,
}
