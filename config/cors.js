const whitelist = ['http://localhost:8080', 'http://localhost:8081']

const corsOptionsDelegate = (req, callback) => {
  let corsOptions = {}
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      exposedHeaders: ['authorization'],
    }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}

module.exports = { corsOptionsDelegate }
