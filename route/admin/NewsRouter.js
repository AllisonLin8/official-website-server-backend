const NewsRouter = require('express').Router()

const NewsController = require('../../controllers/admin/NewsController')

const upload = require('../../middleware/multer')
const { validate } = require('../../middleware/validator')

const { newsHelper } = require('../../helpers/validator-helper')

/**
 * @swagger
 * tags:
 *  name: News
 *  description: '管理新聞資料的 API'
 */

/**
 * @swagger
 * /adminapi/newslist/contentImg:
 *  post:
 *    summary: '上傳新聞內容中的圖片'
 *    tags: [News]
 *    requestBody:
 *      $ref: '#/components/requestBodies/PostNewsContentImg'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/200/PostNewsContentImg'
 *      400:
 *        $ref: '#/components/responses/400'
 */
NewsRouter.post(
  '/contentImg',
  upload.single('file'),
  NewsController.postContentImg
)

/**
 * @swagger
 * /adminapi/newslist/{id}/isPublished:
 *  patch:
 *    summary: '是否發佈新聞'
 *    tags: [News]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: '新聞的 ID'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/200/GeneralRes'
 *      400:
 *        $ref: '#/components/responses/400'
 */
NewsRouter.patch(
  '/:id/isPublished',
  validate(newsHelper.patchNewsIsPublishedHelper),
  NewsController.patchNewsIsPublished
)

/**
 * @swagger
 * /adminapi/newslist/{id}?isDateFormatted={isDateFormatted}:
 *  get:
 *    security:
 *    - bearerAuth: []
 *    summary: '獲取特定新聞的資訊'
 *    tags: [News]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: '新聞的 ID'
 *      - in: query
 *        name: isDateFormatted
 *        schema:
 *          type: boolean
 *        required: false
 *        description: '選擇是否格式化 createdAt 以利閱讀，預設為 true'
 *    responses:
 *      200:
 *        description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/responses/200/News'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 */
NewsRouter.get(
  '/:id',
  validate(newsHelper.getNewsHelper),
  NewsController.getNews
)

/**
 * @swagger
 * /adminapi/newslist/{id}:
 *  put:
 *    summary: '編輯新聞資料'
 *    tags: [News]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: '新聞的 ID'
 *    requestBody:
 *      $ref: '#/components/requestBodies/PutNews'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/200/GeneralRes'
 *      400:
 *        $ref: '#/components/responses/400'
 */
NewsRouter.put(
  '/:id',
  upload.single('file'),
  validate(newsHelper.putNewsHelper),
  NewsController.putNews
)

/**
 * @swagger
 * /adminapi/newslist/{id}:
 *  delete:
 *    summary: '刪除新聞'
 *    tags: [News]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: '新聞的 ID'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/200/GeneralRes'
 *      400:
 *        $ref: '#/components/responses/400'
 */
NewsRouter.delete(
  '/:id',
  validate(newsHelper.deleteNewsHelper),
  NewsController.deleteNews
)

/**
 * @swagger
 * /adminapi/newslist:
 *  get:
 *    security:
 *    - bearerAuth: []
 *    summary: '獲取所有新聞'
 *    tags: [News]
 *    responses:
 *      200:
 *        description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',"
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/responses/200/News'
 *      401:
 *        $ref: '#/components/responses/401'
 */
NewsRouter.get('/', NewsController.getNewsList)

/**
 * @swagger
 * /adminapi/newslist:
 *  post:
 *    summary: '上傳新的新聞'
 *    tags: [News]
 *    requestBody:
 *      $ref: '#/components/requestBodies/PostNews'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/200/GeneralRes'
 *      400:
 *        $ref: '#/components/responses/400'
 */
NewsRouter.post(
  '/',
  upload.single('file'),
  validate(newsHelper.postNewsHelper),
  NewsController.postNews
)

module.exports = NewsRouter
