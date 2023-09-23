const ProductRouter = require('express').Router()

const ProductController = require('../../controllers/web/ProductController')

const { validate } = require('../../middleware/validator')

const { webProductHelper } = require('../../helpers/validator-helper')

/**
 * @swagger
 * tags:
 *  name: WebProducts
 *  description: '獲取產品資料的 API'
 */

/**
 * @swagger
 * /webapi/products/getPaginatedProducts?currentPage={currentPage}&perPage={perPage}&varietyId={varietyId}:
 *  get:
 *    summary: '以分頁形式獲取產品資料'
 *    tags: [WebProducts]
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
 *        name: varietyId
 *        schema:
 *          type: number
 *        required: false
 *        description: '選擇按某類型分類產品，預設為所有類型'
 *    responses:
 *      200:
 *        description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/responses/200/Pagination'
 */
ProductRouter.get(
  '/getPaginatedProducts',
  ProductController.getPaginatedProducts
)

/**
 * @swagger
 * /webapi/products/{id}?isDateFormatted={isDateFormatted}:
 *  get:
 *    summary: '獲取特定產品的資訊'
 *    tags: [WebProducts]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: '產品的 ID'
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
 *              $ref: '#/components/responses/200/Product'
 *      400:
 *        $ref: '#/components/responses/400'
 */
ProductRouter.get(
  '/:id',
  validate(webProductHelper.getProductHelper),
  ProductController.getProduct
)

/**
 * @swagger
 * /webapi/products?length={length}:
 *  get:
 *    summary: '獲取所有產品'
 *    tags: [WebProducts]
 *    parameters:
 *      - in: query
 *        name: length
 *        schema:
 *          type: integer
 *        required: false
 *        description: '要獲取前幾個產品 (以 createdAt 排序)，預設為全部產品'
 *    responses:
 *      200:
 *        description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',"
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/responses/200/Product'
 *      401:
 *        $ref: '#/components/responses/401'
 */
ProductRouter.get('/', ProductController.getProducts)

module.exports = ProductRouter
