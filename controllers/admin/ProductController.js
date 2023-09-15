const { matchedData } = require('express-validator')

const ProductService = require('../../Services/admin/ProductService')

const { imgurFileHandler } = require('../../utils/imgur')

const ProductController = {
  postProduct: async (req, res) => {
    try {
      const { file } = req
      const { title, subtitle, varietyId, desc } = matchedData(req)
      const newData = { title, varietyId, desc }

      if (subtitle) newData.subtitle = subtitle
      const filePath = await imgurFileHandler(file)
      if (filePath) newData.cover = filePath

      const news = await ProductService.postProduct(newData)
      if (news.toJSON())
        return res.json({ status: 'success', msg: '產品儲存成功！' })
      return res.json({ status: 'error', msg: '產品儲存失敗！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
}

module.exports = ProductController
