const bcrypt = require('bcrypt')
const { matchedData } = require('express-validator')

const UserService = require('../../Services/admin/UserService')

const { User } = require('../../db/models')

const JWT = require('../../utils/JWT')
const { imgurFileHandler, localFileHandler } = require('../../utils/imgur')

const UserController = {
  login: async (req, res) => {
    try {
      const { email, password } = matchedData(req)

      const user = await UserService.login(email)
      if (
        !user ||
        user.isDeleted ||
        !bcrypt.compareSync(password, user.password)
      ) {
        return res.json({ status: 'error', msg: '帳號或密碼錯誤！' })
      } else {
        delete user.password
        const token = JWT.generator({ id: user.id, email: user.email })
        res.header('authorization', token)
        res.json({ status: 'success', msg: '登入成功！', userInfo: user })
      }
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  signUp: async (req, res) => {
    try {
      const { name, email, password, roleId } = matchedData(req)
      const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

      const user = await UserService.signUp({
        name,
        email,
        password: hash,
        roleId,
      })
      if (user.toJSON()) {
        return res.json({ status: 'success', msg: '註冊成功！' })
      }
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  getUser: async (req, res) => {
    try {
      const { id } = matchedData(req)

      const user = await UserService.getUser(id)
      if (!user) return res.json({ status: 'error', msg: '該名使用者不存在！' })
      return res.json({ status: 'success', msg: '獲取使用者資料成功！', user })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  putUser: async (req, res) => {
    try {
      const { id, name, email, password, roleId } = matchedData(req)

      const user = User.findOne({ where: { id } })
      if (!user) return res.json({ status: 'error', msg: '該名使用者不存在！' })

      const updatedData = { name, email }
      if (password) {
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        updatedData.password = hash
      }
      if (roleId) updatedData.roleId = roleId

      const updatedUser = await UserService.putUser(id, updatedData)
      if (updatedUser) {
        return res.json({
          status: 'success',
          msg: '個人資料更新成功！',
          updatedUser,
        })
      }
      return res.json({ status: 'error', msg: '個人資料更新失敗！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  patchUserProfile: async (req, res) => {
    try {
      const { file } = req
      const { id, name, intro } = matchedData(req)

      const user = await User.findOne({ where: { id } })
      if (!user) return res.json({ status: 'error', msg: '該名使用者不存在！' })

      if (req.user.id !== Number(id))
        return res.json({ status: 'error', msg: '只能更新自己的個人資料！' })

      const newData = { name, intro }
      const filePath = await imgurFileHandler(file)
      if (filePath) newData.avatar = filePath

      const result = await UserService.patchUserProfile(id, newData)
      if (result[0] === 1) {
        return res.json({
          status: 'success',
          msg: '個人資料更新成功！',
          userInfo: {
            id: req.user.id,
            ...newData,
          },
        })
      }
      return res.json({ status: 'error', msg: '個人資料更新失敗！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  patchUserIsDeleted: async (req, res) => {
    try {
      const { id } = matchedData(req)

      const user = await UserService.getUser(id)
      if (!user) return res.json({ status: 'error', msg: '該名使用者不存在！' })
      if (user?.role === 'root')
        return res.json({ status: 'error', msg: '不可刪除管理員！' })

      const result = await UserService.patchUserIsDeleted(id, user.isDeleted)
      if (result[0] === 1) {
        const msg = !user.isDeleted
          ? '刪除使用者成功！'
          : '取消刪除使用者成功！'
        return res.json({ status: 'success', msg })
      }
      return res.json({ status: 'error', msg: '操作失敗，請稍後再試！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await UserService.getUsers()
      if (users.length !== 0) {
        return res.json({
          status: 'success',
          msg: '獲取所有使用者資料成功！',
          users,
        })
      }
      return res.json({ status: 'error', msg: '目前沒有任何使用者！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
}

module.exports = UserController
