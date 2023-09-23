const { Op } = require('sequelize')

const { Role } = require('../../db/models')

const RoleService = {
  getRoles: async () => {
    try {
      return await Role.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
          name: { [Op.ne]: 'root' },
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = RoleService
