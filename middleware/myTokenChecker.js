const JWT = require('../utils/JWT')
const myTokenChecker = (req, res, next) => {
  if (req.url === '/adminapi/users/login') {
    console.log('進到myTokenChecker')
    next()
    return // return 結束該函式的執行
  }
  // 獲取token
  const authorizationHeader = req.headers['authorization']
  let token = ''
  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1]
  } else {
    res.status(401).send({ error: 'Unauthorized: Missing token' })
    return
  }
  // 檢查token
  if (token) {
    const payload = JWT.verify(token)
    if (payload) {
      // 已經驗證客戶端的token是正確的，重新發一個新的且具時限的token給客戶端
      const newToken = JWT.generator(
        {
          id: payload.id,
          name: payload.name,
        },
        '1d'
      )
      res.header('authorization', newToken)
      next()
    } else {
      res.status(401).send({ errCode: -1, errMsg: 'token已過期！' })
      return
    }
  }
}

module.exports = {
  myTokenChecker,
}
