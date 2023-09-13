const NewsRouter = require('express').Router()
const NewsController = require('../../controllers/admin/NewsController')

const upload = require('../../middleware/multer')
const { validate } = require('../../middleware/validator')

const {
  postNewsHelper,
  patchNewsHelper,
  getNewsHelper,
  deleteNewsHelper,
  putNewsHelper,
} = require('../../helpers/validator-helper')

NewsRouter.patch(
  '/adminapi/news/publish/:newsId',
  validate(patchNewsHelper),
  NewsController.patchNews
)

NewsRouter.post(
  '/adminapi/news/upload',
  upload.single('file'),
  NewsController.upload
)

NewsRouter.get(
  '/adminapi/news/:newsId',
  validate(getNewsHelper),
  NewsController.getNews
)

NewsRouter.delete(
  '/adminapi/news/:newsId',
  validate(deleteNewsHelper),
  NewsController.deleteNews
)

NewsRouter.post(
  '/adminapi/news',
  upload.single('file'),
  validate(postNewsHelper),
  NewsController.postNews
)

NewsRouter.put(
  '/adminapi/news',
  upload.single('file'),
  validate(putNewsHelper),
  NewsController.putNews
)

NewsRouter.get('/adminapi/newslist', NewsController.getNewsList)

module.exports = NewsRouter
