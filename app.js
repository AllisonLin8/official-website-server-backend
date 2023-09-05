if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const path = require('path')
const cors = require('cors')
const express = require('express')

const { corsOptionsDelegate } = require('./config/cors')
const { authenticated } = require('./middleware/myTokenChecker')

const app = express()
const PORT = process.env.PORT || 3000
const UserRouter = require('./route/admin/UserRouter')

app.use(cors(corsOptionsDelegate))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.use(authenticated)

app.use(UserRouter)

app.listen(PORT, () => {
  console.log(`This server is running on http://localhost:${PORT}`)
})
