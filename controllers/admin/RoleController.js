const RoleService = require('../../Services/admin/RoleService')

const RoleController = {
  getRoles: async (req, res) => {
    const roles = await RoleService.getRoles()
    if (roles.length !== 0) {
      return res.json({
        status: 'success',
        msg: '獲取所有角色資料成功！',
        roles,
      })
    } else {
      return res.json({
        status: 'warning',
        msg: '目前沒有任何角色！',
      })
    }
  },
}

module.exports = RoleController
