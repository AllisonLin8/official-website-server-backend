const VarietyRouter = require('express').Router()

const VarietyController = require('../../controllers/web/VarietyController')

/**
 * @swagger
 * tags:
 *  name: WebVarieties
 *  description: '獲取類型的 API (產品的類型)'
 */

/**
 * @swagger
 * /webapi/varieties:
 *  get:
 *    summary: '獲取所有類型 (產品的類型)'
 *    tags: [WebVarieties]
 *    responses:
 *      200:
 *        description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',"
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/responses/200/Variety'
 */
VarietyRouter.get('/', VarietyController.getVarieties)

module.exports = VarietyRouter
