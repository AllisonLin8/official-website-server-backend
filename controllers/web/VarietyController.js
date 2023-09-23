const VarietyService = require('../../Services/web/VarietyService')

const VarietyController = {
  getVarieties: async (req, res) => {
    try {
      const varieties = await VarietyService.getVarieties()
      if (varieties.length !== 0) {
        return res.json({
          status: 'success',
          msg: '獲取所有產品類型資料成功！',
          varieties,
        })
      }
      return res.json({ status: 'warning', msg: '目前沒有任何產品類型！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
}

module.exports = VarietyController
