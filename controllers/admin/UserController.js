const bcrypt = require('bcrypt')
const { matchedData } = require('express-validator')

const UserService = require('../../Services/admin/UserService')

const JWT = require('../../utils/JWT')
const { imgurFileHandler, localFileHandler } = require('../../utils/imgur')

const UserController = {
  login: async (req, res) => {
    const { email, password } = matchedData(req)
    const user = await UserService.login(email)
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.json({
        status: 'error',
        error: '帳號或密碼錯誤！',
      })
    } else {
      delete user.password
      const token = JWT.generator({ id: user.id, email: user.email })
      res.header('authorization', token)
      res.json({
        status: 'success',
        msg: '登入成功！',
        userInfo: user,
      })
    }
  },
  signUp: async (req, res) => {
    const { name, email, password } = matchedData(req)
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    const result = await UserService.signUp({ name, email, password: hash })
    if (result.toJSON()) {
      res.json({
        status: 'success',
        msg: '註冊成功！',
      })
    }
  },
  upload: async (req, res) => {
    const { name, intro } = matchedData(req)
    const { file } = req

    const newData = { id: req.user.id, name, intro }

    const filePath = await imgurFileHandler(file)
    if (filePath) newData.avatar = filePath
    await UserService.upload(newData)

    res.json({
      status: 'success',
      msg: '個人資料更新成功！',
      userInfo: {
        id: req.user.id,
        ...newData,
      },
    })
  },
}

module.exports = UserController
