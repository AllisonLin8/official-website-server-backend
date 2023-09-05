const jsonwebtoken = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const JWT = {
  generator: (value, exp = '10d') => {
    return jsonwebtoken.sign(value, secret, { expiresIn: exp })
  },
  verify: token => {
    try {
      return jsonwebtoken.verify(token, secret)
    } catch (e) {
      return false
    }
  },
}

module.exports = JWT
