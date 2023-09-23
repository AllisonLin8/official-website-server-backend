const VarietyRouter = require('express').Router()

const VarietyController = require('../../controllers/admin/VarietyController')

/**
 * @swagger
 * tags:
 *  name: Varieties
 *  description: '管理類型的 API (產品的類型)'
 */

/**
 * @swagger
 * /adminapi/varieties:
 *  get:
 *    security:
 *    - bearerAuth: []
 *    summary: '獲取所有類型 (產品的類型)'
 *    tags: [Varieties]
 *    responses:
 *      200:
 *        description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',"
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/responses/200/Variety'
 *      401:
 *        $ref: '#/components/responses/401'
 */
VarietyRouter.get('/', VarietyController.getVarieties)

module.exports = VarietyRouter
