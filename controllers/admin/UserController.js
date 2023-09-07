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
    const { name, email, password, roleId } = matchedData(req)
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const result = await UserService.signUp({
      name,
      email,
      password: hash,
      roleId,
    })
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
  getUsers: async (req, res) => {
    const users = await UserService.getUsers()
    if (users.length !== 0) {
      return res.json({
        status: 'success',
        msg: '獲取所有使用者資料成功！',
        users,
      })
    } else {
      return res.json({
        status: 'success',
        msg: '目前沒有任何使用者！',
      })
    }
  },
  getUser: async (req, res) => {
    const { userId } = matchedData(req)
    const user = await UserService.getUser(userId)
    if (!user) {
      return res.json({
        status: 'success',
        msg: '該名使用者不存在！',
      })
    }
    return res.json({
      status: 'success',
      msg: '獲取使用者資料成功！',
      user,
    })
  },
  deleteUser: async (req, res) => {
    const { userId } = matchedData(req)
    const user = await UserService.getUser(userId)
    if (!user) {
      return res.json({
        status: 'success',
        msg: '該名使用者不存在！',
      })
    }
    if (user.role === 'root') {
      return res.json({
        status: 'error',
        msg: '不可刪除管理員！',
      })
    }
    await UserService.deleteUser(userId, user.isDeleted)
    const msg = !user.isDeleted ? '刪除使用者成功！' : '取消刪除使用者成功！'
    return res.json({
      status: 'success',
      msg,
    })
  },
}

module.exports = UserController
