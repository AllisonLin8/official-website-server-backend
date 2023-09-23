const { Product, Variety } = require('../../db/models')

const formatDate = require('../../helpers/dayjs-helper')
const {
  productCleanedDataHelper,
} = require('../../helpers/res-data-cleaned-helper')
const { getOffset, getPagination } = require('../../helpers/pagination-helper')

const ProductService = {
  getPaginatedProducts: async (currentPage, perPage, varietyId) => {
    try {
      const options = {
        raw: true,
        nest: true,
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['varietyId', 'updatedAt'] },
        include: [{ model: Variety, attributes: ['name'] }],
        offset: getOffset(perPage, currentPage),
        limit: perPage,
      }
      if (varietyId && varietyId !== null) options.where = { varietyId }
      const productListByCategory = await Product.findAndCountAll(options)
      if (productListByCategory.hasOwnProperty('count')) {
        const pageInfo = getPagination(
          currentPage,
          perPage,
          productListByCategory.count
        )
        const cleanedProducts =
          productCleanedDataHelper.clearDataForFindAllAndCount(
            productListByCategory
          )
        return { pageInfo, ...cleanedProducts }
      }
      return []
    } catch (error) {
      throw new Error(error)
    }
  },
  getProduct: async (id, isDateFormatted) => {
    try {
      const product = await Product.findOne({
        raw: true,
        nest: true,
        where: { id },
        attributes: { exclude: ['varietyId', 'updatedAt'] },
        include: [{ model: Variety, attributes: ['name'] }],
      })
      if (product) {
        const formattedProduct = {
          ...product,
          variety: product.Variety.name,
        }
        if (isDateFormatted !== 'false') {
          formattedProduct.createdAt = formatDate(formattedProduct.createdAt)
        }
        if (formattedProduct.subtitle === null) delete formattedProduct.subtitle
        delete formattedProduct.Variety
        return formattedProduct
      }
      return null
    } catch (error) {
      throw new Error(error)
    }
  },
  getProducts: async length => {
    try {
      const options = {
        raw: true,
        nest: true,
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['varietyId', 'updatedAt'] },
        include: [{ model: Variety, attributes: ['name'] }],
      }
      if (length && length > 0) options.limit = length
      const products = await Product.findAll(options)
      if (products.length !== 0) {
        const cleanedProducts =
          productCleanedDataHelper.clearDataForFindAll(products)
        return cleanedProducts
      }
      return []
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = ProductService
