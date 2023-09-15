const { Role } = require('../../db/models')

const RoleService = {
  getRoles: async () => {
    try {
      return await Role.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      })
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = RoleService
