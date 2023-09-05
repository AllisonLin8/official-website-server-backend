const { User } = require('../../db/models')

const UserService = {
  login: async email => {
    return await User.findOne({
      where: { email },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      raw: true,
    })
  },
  signUp: async ({ name, email, password, role = 'general' }) => {
    return User.create({ name, email, password, role })
  },
  upload: async uploadData => {
    const { id } = uploadData
    if (uploadData.avatar) {
      const { name, intro, avatar } = uploadData
      return User.update({ name, intro, avatar }, { where: { id } })
    } else {
      const { name, intro } = uploadData
      return User.update({ name, intro }, { where: { id } })
    }
  },
}

module.exports = UserService
