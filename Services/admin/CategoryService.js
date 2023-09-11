const { Category } = require('../../db/models')

const CategoryService = {
  getCategories: async () => {
    return await Category.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })
  },
}

module.exports = CategoryService
