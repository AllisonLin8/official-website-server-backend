const ProductRouter = require('express').Router()

const ProductController = require('../../controllers/admin/ProductController')

const upload = require('../../middleware/multer')
const { validate } = require('../../middleware/validator')

const { productHelper } = require('../../helpers/validator-helper')

ProductRouter.get(
  '/products/:productId',
  validate(productHelper.getProductHelper),
  ProductController.getProduct
)

ProductRouter.delete(
  '/products/:productId',
  validate(productHelper.deleteProductHelper),
  ProductController.deleteProduct
)

ProductRouter.post(
  '/products',
  upload.single('file'),
  validate(productHelper.postProductHelper),
  ProductController.postProduct
)

ProductRouter.put(
  '/products',
  upload.single('file'),
  validate(productHelper.putProductHelper),
  ProductController.putProduct
)

ProductRouter.get('/products', ProductController.getProducts)

module.exports = ProductRouter
