const { matchedData } = require('express-validator')

const ProductService = require('../../Services/web/ProductService')

const ProductController = {
  getPaginatedProducts: async (req, res) => {
    try {
      const { currentPage, perPage, varietyId } = req.query
      const products = await ProductService.getPaginatedProducts(
        currentPage ? Number(currentPage) : 1,
        perPage ? Number(perPage) : 10,
        varietyId ? Number(varietyId) : null
      )
      if (products.hasOwnProperty('data'))
        return res.json({
          status: 'success',
          msg: '獲取所有產品成功！',
          products,
        })
      return res.json({ status: 'warning', msg: '目前沒有任何產品！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  getProduct: async (req, res) => {
    try {
      const { id } = matchedData(req)
      const isDateFormatted = req.query.isDateFormatted
      const product = await ProductService.getProduct(id, isDateFormatted)
      if (!product) return res.json({ status: 'error', msg: '該產品不存在！' })
      return res.json({ status: 'success', msg: '獲取產品成功！', product })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  getProducts: async (req, res) => {
    try {
      const { length } = req.query
      const products = await ProductService.getProducts(
        length ? Number(length) : null
      )
      if (products.length !== 0)
        return res.json({
          status: 'success',
          msg: '獲取所有產品成功！',
          products,
        })
      return res.json({ status: 'warning', msg: '目前沒有任何產品！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
}

module.exports = ProductController
