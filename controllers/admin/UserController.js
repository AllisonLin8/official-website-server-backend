const UserService = require('../../Services/admin/UserService')
const JWT = require('../../utils/JWT')
const { imgurFileHandler, localFileHandler } = require('../../utils/imgur')
const UserController = {
  login: async (req, res) => {
    const { email, password } = req.body
    const result = await UserService.login(email, password)
    if (result.length === 0) {
      res.json({
        status: 'error',
        error: '帳號或密碼錯誤！',
      })
    } else {
      const token = JWT.generator({ id: result[0].id, email: result[0].email })
      res.header('authorization', token)
      res.json({
        status: 'success',
        msg: '登入成功！',
        userInfo: result[0],
      })
    }
  },
  upload: async (req, res) => {
    const { name, intro } = req.body
    const { file } = req

    const newData = { id: req.user.id, name, intro }

    const filePath = await imgurFileHandler(file)
    if (filePath) newData.avatar = filePath
    await UserService.upload(newData)

    res.json({
      status: 'success',
      msg: '個人資料更新成功',
      userInfo: {
        id: req.user.id,
        ...newData,
      },
    })
  },
}

module.exports = UserController
