const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy
const { User, Role } = require('../db/models')

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

const strategy = new JWTStrategy(jwtOptions, function (jwtPayload, done) {
  User.findByPk(jwtPayload.id, {
    attributes: { exclude: ['password', 'roleId', 'createdAt', 'updatedAt'] },
    include: [{ model: Role, attributes: ['name'] }],
    raw: true,
    nest: true,
  })
    .then(user => {
      if (!user) return done(null, false)
      user.role = user.Role.name
      delete user.Role
      return done(null, user)
    })
    .catch(err => done(err))
})

passport.use(strategy)

module.exports = passport
