const { body } = require('express-validator')
const loginDataHelper = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('請填入 Email！')
    .isEmail()
    .withMessage('Email 格式不符！'),
  body('password').trim().notEmpty().withMessage('請填入 Password！'),
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
  modifyPersonalInfo,
}
