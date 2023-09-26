const UserRouter = require('express').Router()

const UserController = require('../../controllers/admin/UserController')

const upload = require('../../middleware/multer')
const { validate } = require('../../middleware/validator')
const { authenticatedRoot } = require('../../middleware/auth')

const { userHelper } = require('../../helpers/validator-helper')

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: '管理使用者資料的 API'
 */

/**
 * @swagger
 * /adminapi/users/login:
 *  post:
 *    summary: '使用者登入'
 *    tags: [Users]
 *    requestBody:
 *      $ref: '#/components/requestBodies/Login'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/200/Login'
 *      400:
 *        $ref: '#/components/responses/400'
 */
UserRouter.post(
  '/login',
  validate(userHelper.loginHelper),
  UserController.login
)

/**
 * @swagger
 * /adminapi/users/signup:
 *  post:
 *    summary: '使用者註冊'
 *    tags: [Users]
 *    requestBody:
 *      $ref: '#/components/requestBodies/Signup'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/200/GeneralRes'
 *      400:
 *        $ref: '#/components/responses/400'
 */
UserRouter.post(
  '/signup',
  validate(userHelper.signUpHelper),
  UserController.signUp
)

/**
 * @swagger
 * /adminapi/users/{id}:
 *  get:
 *    security:
 *    - bearerAuth: []
 *    summary: '獲取特定使用者的資訊'
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: '使用者的 ID'
 *    responses:
 *      200:
 *        description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/responses/200/User'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 */
UserRouter.get(
  '/:id',
  authenticatedRoot,
  validate(userHelper.getUserHelper),
  UserController.getUser
)

/**
 * @swagger
 * /adminapi/users/{id}:
 *  put:
 *    summary: '編輯使用者資料'
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: '使用者的 ID'
 *    requestBody:
 *      $ref: '#/components/requestBodies/PutUser'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/200/PutUser'
 *      400:
 *        $ref: '#/components/responses/400'
 */
UserRouter.put(
  '/:id',
  authenticatedRoot,
  validate(userHelper.putUserHelper),
  UserController.putUser
)

/**
 * @swagger
 * /adminapi/users/{id}/profile:
 *  patch:
 *    summary: '編輯使用者資料中的 profile 部份'
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: '使用者的 ID'
 *    requestBody:
 *      $ref: '#/components/requestBodies/PatchUserProfile'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/200/PatchUserProfile'
 *      400:
 *        $ref: '#/components/responses/400'
 */
UserRouter.patch(
  '/:id/profile',
  upload.single('file'),
  validate(userHelper.patchUserProfileHelper),
  UserController.patchUserProfile
)

/**
 * @swagger
 * /adminapi/users/{id}/isDeleted:
 *  patch:
 *    summary: '是否刪除使用者'
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: '使用者的 ID'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/200/GeneralRes'
 *      400:
 *        $ref: '#/components/responses/400'
 */
UserRouter.patch(
  '/:id/isDeleted',
  authenticatedRoot,
  validate(userHelper.patchUserIsDeletedHelper),
  UserController.patchUserIsDeleted
)

/**
 * @swagger
 * /adminapi/users:
 *  get:
 *    security:
 *    - bearerAuth: []
 *    summary: '獲取所有使用者'
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: "status: '請求成功(success)或失敗(error)', msg: '提示訊息',"
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/responses/200/User'
 *      401:
 *        $ref: '#/components/responses/401'
 */
UserRouter.get('/', authenticatedRoot, UserController.getUsers)

module.exports = UserRouter
