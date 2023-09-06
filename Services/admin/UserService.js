const { User, Role } = require('../../db/models')

const UserService = {
  login: async email => {
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['roleId', 'createdAt', 'updatedAt'] },
      include: [{ model: Role, attributes: ['name'] }],
      raw: true,
      nest: true,
    })
    if (user) {
      user.role = user.Role.name
      delete user.Role
      return user
    }
  },
  signUp: async ({ name, email, password, roleId }) => {
    if (!roleId || roleId === '') {
      const generalRole = await Role.findOne({
        where: { name: 'general' },
        attributes: ['id'],
        raw: true,
      })
      roleId = generalRole.id
    }

    return await User.create({ name, email, password, roleId })
  },
  upload: async uploadData => {
    const { id } = uploadData
    if (uploadData.avatar) {
      const { name, intro, avatar } = uploadData
      return await User.update({ name, intro, avatar }, { where: { id } })
    } else {
      const { name, intro } = uploadData
      return await User.update({ name, intro }, { where: { id } })
    }
  },
}

module.exports = UserService
