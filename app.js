const express = require('express')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const JWT = require('./utils/JWT')

const app = express()
const PORT = process.env.PORT || 3000
const UserRouter = require('./route/admin/UserRouter')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  if (req.url === '/adminapi/user/login') {
    next()
    return
  }
  // 檢查token
  const token = req.headers['authorization'].split(' ')[1]
  if (token) {
    const payload = JWT.verify(token)
    if (payload) {
      // 已經驗證客戶端的token是正確的，重新發一個新的且具時限的token給客戶端
      const newToken = JWT.generator({
        id: payload.id,
        name:payload.name
      }, '1d')
      res.header('Authorization', newToken)
      next()
    } else {
      res.status(401).send({ errCode: -1, errMsg: 'token已過期！' })
    }
  }
  
})

app.use(UserRouter)

app.get('/', (req, res) => {
  res.send('測試中')
})

app.listen(PORT, () => {
  console.log(`This server is running on http://localhost:${PORT}`)
})
