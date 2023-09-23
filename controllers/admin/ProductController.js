const { matchedData } = require('express-validator')

const ProductService = require('../../Services/admin/ProductService')

const { imgurFileHandler } = require('../../utils/imgur')

const ProductController = {
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
  putProduct: async (req, res) => {
    try {
      const { file } = req
      const { id, title, subtitle, varietyId, desc, createdAt } =
        matchedData(req)

      const product = await ProductService.getProduct(id)
      if (!product) return res.json({ status: 'error', msg: '該產品不存在！' })

      const newData = { title, subtitle, varietyId, desc, createdAt }

      const filePath = await imgurFileHandler(file)
      if (filePath) newData.cover = filePath

      const result = await ProductService.putProduct(id, newData)
      if (result) return res.json({ status: 'success', msg: '產品編輯成功！' })
      return res.json({ status: 'error', msg: '產品編輯失敗！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = matchedData(req)

      const product = await ProductService.getProduct(id)
      if (!product) return res.json({ status: 'error', msg: '該產品不存在！' })

      const result = await ProductService.deleteProduct(id)
      if (result) return res.json({ status: 'success', msg: '產品刪除成功！' })
      return res.json({ status: 'error', msg: '產品刪除失敗！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  postProduct: async (req, res) => {
    try {
      const { file } = req
      const { title, subtitle, varietyId, desc } = matchedData(req)
      const newData = { title, varietyId, desc }
      if (subtitle) newData.subtitle = subtitle
      const filePath = await imgurFileHandler(file)
      if (filePath) {
        newData.cover = filePath
      } else {
        return res.json({ status: 'error', msg: '需上傳產品圖片！' })
      }
      const news = await ProductService.postProduct(newData)
      if (news.toJSON())
        return res.json({ status: 'success', msg: '產品儲存成功！' })
      return res.json({ status: 'error', msg: '產品儲存失敗！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  getProducts: async (req, res) => {
    try {
      const { length } = req.query
      const products = await ProductService.getProducts(Number(length))
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
