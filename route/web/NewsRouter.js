const NewsRouter = require('express').Router()

const NewsController = require('../../controllers/web/NewsController')

const { validate } = require('../../middleware/validator')

const { webNewsHelper } = require('../../helpers/validator-helper')

/**
 * @swagger
 * tags:
 *  name: WebNews
 *  description: '獲取新聞資料的 API'
 */

/**
 * @swagger
 * /webapi/newslist/getPaginatedNewslist?currentPage={currentPage}&perPage={perPage}&categoryId={categoryId}&orderBy={orderBy}:
 *  get:
 *    summary: '以分頁形式獲取新聞資料'
 *    tags: [WebNews]
 *    parameters:
 *      - in: query
 *        name: currentPage
 *        schema:
 *          type: number
 *        required: true
 *        description: '指定目前的頁碼，預設為 1'
 *      - in: query
 *        name: perPage
 *        schema:
 *          type: number
 *        required: true
 *        description: '指定每一頁的資料量，預設為 10'
 *      - in: query
 *        name: categoryId
 *        schema:
 *          type: number
 *        required: false
 *        description: '選擇按某類型分類新聞，預設為所有類型'
 *      - in: query
 *        name: orderBy
 *        schema:
 *          type: string
 *        required: false
 *        description: '選擇排序依據(是否依照 viewCount)，預設為 updatedAt'
 *    responses:
 *      200:
 *        description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/responses/200/Pagination'
 */
NewsRouter.get('/getPaginatedNewslist', NewsController.getPaginatedNewsList)

/**
 * @swagger
 * /webapi/newslist/{id}/viewCountIncrement:
 *  post:
 *    summary: '增加某篇新聞的點閱次數'
 *    tags: [WebNews]
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
NewsRouter.post(
  '/:id/viewCountIncrement',
  validate(webNewsHelper.postNewsViewCount),
  NewsController.postNewsViewCount
)

/**
 * @swagger
 * /webapi/newslist/{id}?isDateFormatted={isDateFormatted}:
 *  get:
 *    summary: '獲取特定新聞的資訊'
 *    tags: [WebNews]
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
 *              $ref: '#/components/responses/200/web/News'
 *      400:
 *        $ref: '#/components/responses/400'
 */
NewsRouter.get(
  '/:id',
  validate(webNewsHelper.getNewsHelper),
  NewsController.getNews
)

/**
 * @swagger
 * /webapi/newslist?length={length}&categoryId={categoryId}&orderBy={orderBy}:
 *  get:
 *    summary: '獲取所有新聞'
 *    tags: [WebNews]
 *    parameters:
 *      - in: query
 *        name: length
 *        schema:
 *          type: number
 *        required: false
 *        description: '選擇新聞資料的長度，和分類一起選擇的話，則會依每個分類取長度，預設為全部'
 *      - in: query
 *        name: categoryId
 *        schema:
 *          type: number
 *        required: false
 *        description: '選擇按某類型分類新聞，預設為所有類型'
 *      - in: query
 *        name: orderBy
 *        schema:
 *          type: string
 *        required: false
 *        description: '選擇排序依據(是否依照 viewCount)，預設為 updatedAt'
 *    responses:
 *      200:
 *        description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',"
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/responses/200/web/News'
 */
NewsRouter.get('/', NewsController.getNewsList)

module.exports = NewsRouter
