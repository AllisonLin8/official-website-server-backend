const { Role } = require('../../db/models')

const RoleService = {
  getRoles: async () => {
    return await Role.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })
  },
}

module.exports = RoleService
