const JWT = require('../utils/JWT')
const passport = require('../config/passport')
const noVerification = ['/adminapi/users/login']

const authenticated = (req, res, next) => {
  // 確認該路由是否需要驗證
  if (noVerification.includes(req.url)) {
    next()
    return // return 結束該函式的執行
  }

  // passport驗證
  passport.authenticate('jwt', { session: false }, (err, user) => {
    // 當passport驗證失敗
    if (err || !user) {
      return res.status(401).json({ status: 'error', msg: 'Unauthorized' }) // 自定義回傳值
    }

    // 把user結果存起來，供下一個中間件使用
    req.user = user

    // 已經驗證客戶端的token是正確的，重新發一個新的且具時限的token給客戶端
    const newToken = JWT.generator({ id: user.id, name: user.name })
    res.header('authorization', newToken)

    return next()
  })(req, res, next)
}

module.exports = {
  authenticated,
}
