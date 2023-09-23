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
        title: '這邊是使用 swagger 建立的 API 文件',
        version: '1.0.0',
        description:
          '本專案使用 experss 搭建，作為「企業官網後台管理和前台」的後端，API 主要分為 admin 和 web 兩部份，目前 web 尚未實作。',
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
      servers: [{ url: 'http://localhost:3000', description: 'Local server' }],
    },
    apis: [
      // files containing annotations as above
      './route/admin/UserRouter.js',
      './route/admin/NewsRouter.js',
      './route/admin/ProductRouter.js',
      './route/admin/CategoryRouter.js',
      './route/admin/RoleRouter.js',
      './route/admin/VarietyRouter.js',
    ],
  }

  const specs = swaggerJsdoc(options)
  app.use('/api-docs', serve, setup(specs))
}

module.exports = initSwagger
