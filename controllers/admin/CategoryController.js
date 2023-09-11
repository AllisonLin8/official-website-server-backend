const CategoryService = require('../../Services/admin/CategoryService')

const CategoryController = {
  getCategories: async (req, res) => {
    const categories = await CategoryService.getCategories()
    if (categories.length !== 0) {
      return res.json({
        status: 'success',
        msg: '獲取所有類型資料成功！',
        categories,
      })
    } else {
      return res.json({
        status: 'warning',
        msg: '目前沒有任何類型！',
      })
    }
  },
}

module.exports = CategoryController
