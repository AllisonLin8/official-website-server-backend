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
    const { id } = newData
    if (newData.avatar) {
      const { name, intro, avatar } = newData
      return User.update({ name, intro, avatar }, { where: { id } })
    } else {
      const { name, intro } = newData
      return User.update({ name, intro }, { where: { id } })
    }
  },
}

module.exports = UserService
