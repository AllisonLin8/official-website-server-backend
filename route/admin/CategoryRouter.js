const CategoryRouter = require('express').Router()

const CategoryController = require('../../controllers/admin/CategoryController')

/**
 * @swagger
 * tags:
 *  name: Categories
 *  description: '管理類型的 API (新聞的類型)'
 */

/**
 * @swagger
 * /adminapi/categories:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: '獲取所有類型 (新聞的類型)'
 *    tags: [Categories]
 *    responses:
 *      200:
 *        description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',"
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/responses/200/Category'
 *      401:
 *        $ref: '#/components/responses/401'
 */
CategoryRouter.get('/', CategoryController.getCategories)

module.exports = CategoryRouter
