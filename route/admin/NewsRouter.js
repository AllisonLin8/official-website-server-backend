const NewsRouter = require('express').Router()

const NewsController = require('../../controllers/admin/NewsController')

const upload = require('../../middleware/multer')
const { validate } = require('../../middleware/validator')

const { newsHelper } = require('../../helpers/validator-helper')

NewsRouter.patch(
  '/news/publish/:newsId',
  validate(newsHelper.patchNewsHelper),
  NewsController.patchNews
)

NewsRouter.post('/news/upload', upload.single('file'), NewsController.upload)

NewsRouter.get(
  '/news/:newsId',
  validate(newsHelper.getNewsHelper),
  NewsController.getNews
)

NewsRouter.delete(
  '/news/:newsId',
  validate(newsHelper.deleteNewsHelper),
  NewsController.deleteNews
)

NewsRouter.post(
  '/news',
  upload.single('file'),
  validate(newsHelper.postNewsHelper),
  NewsController.postNews
)

NewsRouter.put(
  '/news',
  upload.single('file'),
  validate(newsHelper.putNewsHelper),
  NewsController.putNews
)

NewsRouter.get('/newslist', NewsController.getNewsList)

module.exports = NewsRouter
