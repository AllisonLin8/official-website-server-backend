const adminapi = require('./admin.js')
const webapi = require('./web.js')

module.exports = app => {
  app.use('/adminapi', adminapi)
  app.use('/webapi', webapi)
}
