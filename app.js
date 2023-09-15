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
const useRouter = require('./route/index')

app.use(cors(corsOptionsDelegate))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/upload', express.static(path.join(__dirname, 'upload')))

app.use(authenticated)

useRouter(app)

app.listen(PORT, () => {
  console.log(`This server is running on http://localhost:${PORT}`)
})
