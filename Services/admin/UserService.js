const { User, Role } = require('../../db/models')

const UserService = {
  login: async email => {
    try {
      const user = await User.findOne({
        raw: true,
        nest: true,
        where: { email },
        include: [{ model: Role, attributes: ['name'] }],
        attributes: { exclude: ['roleId', 'createdAt', 'updatedAt'] },
      })
      if (user) {
        user.role = user.Role.name
        delete user.Role
        return user
      }
      return null
    } catch (error) {
      throw new Error(error)
    }
  },
  signUp: async ({ name, email, password, roleId }) => {
    try {
      if (!roleId || roleId === '') {
        const generalRole = await Role.findOne({
          raw: true,
          attributes: ['id'],
          where: { name: 'general' },
        })
        roleId = generalRole.id
      }

      return await User.create({ name, email, password, roleId })
    } catch (error) {
      throw new Error(error)
    }
  },
  getUser: async id => {
    try {
      const user = await User.findOne({
        raw: true,
        nest: true,
        where: { id },
        include: [{ model: Role, attributes: ['name'] }],
        attributes: {
          exclude: ['roleId', 'password', 'intro', 'createdAt', 'updatedAt'],
        },
      })
      if (user) {
        user.role = user.Role.name
        delete user.Role
        return user
      }
      return null
    } catch (error) {
      throw new Error(error)
    }
  },
  putUser: async (id, newData) => {
    try {
      const putUser = await User.update(newData, { where: { id } })
      if (putUser[0] === 1) {
        const updatedUser = await User.findOne({
          raw: true,
          nest: true,
          where: { id },
          attributes: ['email', 'name'],
          include: [{ model: Role, attributes: ['name'] }],
        })
        if (updatedUser) {
          updatedUser.role = updatedUser.Role.name
          delete updatedUser.Role
          return updatedUser
        }
        return null
      }
      return false
    } catch (error) {
      throw new Error(error)
    }
  },
  patchUserProfile: async (id, profile) => {
    try {
      return await User.update(profile, { where: { id } })
    } catch (error) {
      throw new Error(error)
    }
  },
  patchUserIsDeleted: async (id, isDeleted) => {
    try {
      return await User.update(
        { isDeleted: !isDeleted },
        { where: { id }, raw: true }
      )
    } catch (error) {
      throw new Error(error)
    }
  },
  getUsers: async () => {
    try {
      const users = await User.findAll({
        raw: true,
        nest: true,
        order: [['id']],
        include: [{ model: Role, attributes: ['name'] }],
        attributes: {
          exclude: ['password', 'intro', 'roleId', 'createdAt', 'updatedAt'],
        },
      })
      if (users.length !== 0) {
        users.forEach(item => {
          item.role = item.Role.name
          delete item.Role
        })
        return users
      }
      return []
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = UserService
