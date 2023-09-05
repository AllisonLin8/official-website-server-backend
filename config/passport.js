const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy
const { User } = require('../db/models')

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

const strategy = new JWTStrategy(jwtOptions, function (jwtPayload, done) {
  User.findByPk(jwtPayload.id, {
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  })
    .then(user => {
      if (!user) return done(null, false)
      return done(null, user.toJSON())
    })
    .catch(err => done(err))
})

passport.use(strategy)

module.exports = passport
