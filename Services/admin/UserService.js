const { raw } = require('express')
const { User } = require('../../db/models')

const UserService = {
  login: async (email, password) => {
    // return 資料庫查詢結果
    return User.findAll({
      raw: true,
      nest: true,
      where: { email, password },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    })
  },
  upload: async newData => {
    const originalData = await User.findOne({
      where: { id: newData.id },
      raw: true,
    })

    const originalAvatar = originalData.avatar
    const { id, name, intro } = newData
    const avatar = newData.avatar || originalAvatar
    return User.update({ name, intro, avatar }, { where: { id } })
  },
}

module.exports = UserService
