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
}

module.exports = UserService
