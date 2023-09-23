const { Variety } = require('../../db/models')

const VarietyService = {
  getVarieties: async () => {
    try {
      return await Variety.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      })
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = VarietyService
