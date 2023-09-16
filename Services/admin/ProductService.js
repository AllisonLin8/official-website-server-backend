const { Product, Variety } = require('../../db/models')

const formatDate = require('../../helpers/dayjs-helper')

const ProductService = {
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
        attributes: { exclude: ['categoryId', 'updatedAt'] },
        include: [{ model: Variety, attributes: ['name'] }],
      }

      if (length && length > 0) options.limit = length

      const products = await Product.findAll(options)
      if (products.length !== 0) {
        const formattedProducts = products.map(item => {
          const clearData = {
            ...item,
            desc: item.desc.substring(0, 120) + '...',
            createdAt: formatDate(item.createdAt),
            variety: item.Variety.name,
          }
          delete clearData.Variety
          return clearData
        })
        return formattedProducts
      }
      return []
    } catch (error) {
      throw new Error(error)
    }
  },
  postProduct: async postData => {
    try {
      return await Product.create(postData)
    } catch (error) {
      throw new Error(error)
    }
  },
  putProduct: async newData => {
    try {
      const putProduct = await Product.update(newData, {
        where: { id: newData.id },
      })
      if (putProduct[0] === 1) return true
      return false
    } catch (error) {
      throw new Error(error)
    }
  },
  deleteProduct: async id => {
    try {
      const deleteProduct = await Product.destroy({ where: { id } })
      if (deleteProduct === 1) return true
      return false
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = ProductService
