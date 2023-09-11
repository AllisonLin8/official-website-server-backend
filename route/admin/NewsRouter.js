const NewsRouter = require('express').Router()
const NewsController = require('../../controllers/admin/NewsController')

const upload = require('../../middleware/multer')
const { validate } = require('../../middleware/validator')

const { postNewsHelper } = require('../../helpers/validator-helper')

NewsRouter.post(
  '/adminapi/news/upload',
  upload.single('file'),
  NewsController.upload
)

NewsRouter.post(
  '/adminapi/news/',
  upload.single('file'),
  validate(postNewsHelper),
  NewsController.postNews
)

module.exports = NewsRouter
