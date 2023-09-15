const RoleService = require('../../Services/admin/RoleService')

const RoleController = {
  getRoles: async (req, res) => {
    try {
      const roles = await RoleService.getRoles()
      if (roles.length !== 0) {
        return res.json({
          status: 'success',
          msg: '獲取所有角色資料成功！',
          roles,
        })
      }
      return res.json({ status: 'warning', msg: '目前沒有任何角色！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
}

module.exports = RoleController
