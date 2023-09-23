const CategoryRouter = require('express').Router()

const CategoryController = require('../../controllers/web/CategoryController')

/**
 * @swagger
 * tags:
 *  name: WebCategories
 *  description: '獲取類型的 API (新聞的類型)'
 */

/**
 * @swagger
 * /webapi/categories:
 *  get:
 *    summary: '獲取所有類型 (新聞的類型)'
 *    tags: [WebCategories]
 *    responses:
 *      200:
 *        description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',"
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/responses/200/Category'
 */
CategoryRouter.get('/', CategoryController.getCategories)

module.exports = CategoryRouter
