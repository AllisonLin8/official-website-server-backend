const RoleRouter = require('express').Router()

const RoleController = require('../../controllers/admin/RoleController')

/**
 * @swagger
 * tags:
 *  name: Roles
 *  description: '管理權限的 API (使用者的權限)'
 */

/**
 * @swagger
 * /adminapi/roles:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: '獲取所有權限 (權限角色)'
 *    tags: [Roles]
 *    responses:
 *      200:
 *        description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',"
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/responses/200/Role'
 *      401:
 *        $ref: '#/components/responses/401'
 */
RoleRouter.get('/', RoleController.getRoles)

module.exports = RoleRouter
