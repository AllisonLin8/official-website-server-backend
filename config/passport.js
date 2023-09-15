const passport = require('passport')
const passportJWT = require('passport-jwt')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const { User, Role } = require('../db/models')

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

const strategy = new JWTStrategy(jwtOptions, function (jwtPayload, done) {
  User.findByPk(jwtPayload.id, {
    raw: true,
    nest: true,
    include: [{ model: Role, attributes: ['name'] }],
    attributes: { exclude: ['password', 'roleId', 'createdAt', 'updatedAt'] },
  })
    .then(user => {
      if (!user || user.isDeleted) return done(null, false)
      user.role = user.Role.name
      delete user.Role
      return done(null, user)
    })
    .catch(err => done(err))
})

passport.use(strategy)

module.exports = passport
