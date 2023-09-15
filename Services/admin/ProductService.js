const { Product } = require('../../db/models')

const ProductService = {
  postProduct: async postData => {
    try {
      return await Product.create(postData)
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = ProductService
