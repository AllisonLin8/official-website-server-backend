const UserService = require('../../Services/admin/UserService')
const JWT = require('../../utils/JWT')
const UserController = {
  login: async (req, res) => {
    const { email, password } = req.body
    const result = await UserService.login(email, password)
    if (result.length === 0) {
      res.send({
        code: -1,
        error: '帳號或密碼錯誤！',
      })
    } else {
      const token = JWT.generator(
        {
          id: result[0].id,
          name: result[0].name,
        },
        '1d'
      )
      res.header('Authorization', token)
      res.send({
        ActionType: 'OK',
        msg: '登入成功！',
      })
    }
  },
}

module.exports = UserController
