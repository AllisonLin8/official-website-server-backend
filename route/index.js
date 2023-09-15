const adminapi = require('./admin.js')

module.exports = app => {
  app.use('/adminapi', adminapi)
}
