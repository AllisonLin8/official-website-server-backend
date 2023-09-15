const ProductRouter = require('express').Router()

const ProductController = require('../../controllers/admin/ProductController')

const upload = require('../../middleware/multer')
const { validate } = require('../../middleware/validator')

const { productHelper } = require('../../helpers/validator-helper')

ProductRouter.post(
  '/products',
  upload.single('file'),
  validate(productHelper.postProductHelper),
  ProductController.postProduct
)
module.exports = ProductRouter
