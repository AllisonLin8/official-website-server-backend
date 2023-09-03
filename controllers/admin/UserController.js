const UserService = require('../../Services/admin/UserService')
const JWT = require('../../utils/JWT')
const { imgurFileHandler, localFileHandler } = require('../../utils/imgur')
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
          email: result[0].email,
        },
        '1d'
      )
      res.header('authorization', token)
      res.send({
        ActionType: 'OK',
        msg: '登入成功！',
        userInfo: result[0],
      })
    }
  },
  upload: async (req, res) => {
    // TODO 取得token拆出去
    const token = req.headers['authorization']
      ? req.headers['authorization'].split(' ')[1]
      : ''
    const payload = token ? JWT.verify(token) : {}

    const { name, intro } = req.body
    const { file } = req

    const newData = { id: payload.id, name, intro }

    const filePath = await imgurFileHandler(file)

    if (filePath) {
      newData.avatar = filePath
    }

    await UserService.upload(newData)

    res.send({
      ActionType: 'OK',
      msg: '個人資料更新成功',
      userInfo: {
        id: payload.id,
        ...newData,
      },
    })
  },
}

module.exports = UserController
