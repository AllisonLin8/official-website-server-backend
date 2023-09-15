const CategoryService = require('../../Services/admin/CategoryService')

const CategoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await CategoryService.getCategories()
      if (categories.length !== 0) {
        return res.json({
          status: 'success',
          msg: '獲取所有新聞類型資料成功！',
          categories,
        })
      }
      return res.json({ status: 'warning', msg: '目前沒有任何新聞類型！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
}

module.exports = CategoryController
