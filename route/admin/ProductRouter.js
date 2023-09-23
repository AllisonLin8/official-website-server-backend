const ProductRouter = require('express').Router()

const ProductController = require('../../controllers/admin/ProductController')

const upload = require('../../middleware/multer')
const { validate } = require('../../middleware/validator')

const { productHelper } = require('../../helpers/validator-helper')

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: '管理產品資料的 API'
 */

/**
 * @swagger
 * /adminapi/products/{id}?isDateFormatted={isDateFormatted}:
 *  get:
 *    security:
 *    - bearerAuth: []
 *    summary: '獲取特定產品的資訊'
 *    tags: [Products]
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
 *      401:
 *        $ref: '#/components/responses/401'
 */
ProductRouter.get(
  '/:id',
  validate(productHelper.getProductHelper),
  ProductController.getProduct
)

/**
 * @swagger
 * /adminapi/products/{id}:
 *  put:
 *    summary: '編輯產品資料'
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: '產品的 ID'
 *    requestBody:
 *      $ref: '#/components/requestBodies/PutProduct'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/200/GeneralRes'
 *      400:
 *        $ref: '#/components/responses/400'
 */
ProductRouter.put(
  '/:id',
  upload.single('file'),
  validate(productHelper.putProductHelper),
  ProductController.putProduct
)

/**
 * @swagger
 * /adminapi/products/{id}:
 *  delete:
 *    summary: '刪除產品'
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: '產品的 ID'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/200/GeneralRes'
 *      400:
 *        $ref: '#/components/responses/400'
 */
ProductRouter.delete(
  '/:id',
  validate(productHelper.deleteProductHelper),
  ProductController.deleteProduct
)

/**
 * @swagger
 * /adminapi/products:
 *  post:
 *    summary: '上傳新的產品'
 *    tags: [Products]
 *    requestBody:
 *      $ref: '#/components/requestBodies/PostProduct'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/200/GeneralRes'
 *      400:
 *        $ref: '#/components/responses/400'
 */
ProductRouter.post(
  '/',
  upload.single('file'),
  validate(productHelper.postProductHelper),
  ProductController.postProduct
)

/**
 * @swagger
 * /adminapi/products?length={length}:
 *  get:
 *    security:
 *    - bearerAuth: []
 *    summary: '獲取所有產品'
 *    tags: [Products]
 *    parameters:
 *      - in: query
 *        name: length
 *        schema:
 *          type: integer
 *        required: false
 *        description: '要獲取前幾個產品 (以 upatedAt 排序)，預設為全部產品'
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
