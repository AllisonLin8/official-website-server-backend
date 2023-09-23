const { Category } = require('../../db/models')

const CategoryService = {
  getCategories: async () => {
    try {
      return await Category.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      })
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = CategoryService
