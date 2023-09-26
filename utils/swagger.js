const swaggerJsdoc = require('swagger-jsdoc')
const { setup, serve } = require('swagger-ui-express')

const schemas = require('../helpers/swagger-schemas-helper')
const responses = require('../helpers/swagger-responses-helper')
const requestBodies = require('../helpers/swagger-requestBodies-helper')

const initSwagger = app => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: '企業官網及其後台管理 API 文件',
        version: '1.0.0',
        description:
          '本伺服器使用 Express 搭建，作為「企業官網後台管理和前台撈取資料用」的後端，相應的 API 分別是 admin 和 web 兩部份。以下 API 文件 ，均以資料 model 作為分類名稱並列出所有路由訊息，如：Users、News 等等，其中以 web 開頭的名稱供前台使用，如：WebNews、WebProducts 等等，無須 token 驗證；反之，非以 web 開頭的分類即是供給後台使用，後台路由除了 login 和 signup 皆須 token 驗證。',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            in: 'header',
            name: 'Authorization',
            description: 'Bearer Token',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        schemas,
        responses,
        requestBodies,
      },
      security: [{ bearerAuth: [] }],
      servers: [
        {
          url: 'http://obsb.ap-northeast-1.elasticbeanstalk.com',
          description: 'AWS server',
        },
        { url: 'http://localhost:3000', description: 'Local server' },
      ],
    },
    apis: [
      // adminApi
      './route/admin/UserRouter.js',
      './route/admin/NewsRouter.js',
      './route/admin/ProductRouter.js',
      './route/admin/RoleRouter.js',
      './route/admin/CategoryRouter.js',
      './route/admin/VarietyRouter.js',
      // webApi
      './route/web/NewsRouter.js',
      './route/web/ProductRouter.js',
      './route/web/CategoryRouter.js',
      './route/web/VarietyRouter.js',
    ],
  }

  const specs = swaggerJsdoc(options)
  app.use('/api-docs', serve, setup(specs))
}

module.exports = initSwagger
