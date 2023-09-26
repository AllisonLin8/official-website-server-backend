const whitelist = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://owwf.s3-website-ap-northeast-1.amazonaws.com',
  'http://owaf.s3-website-ap-northeast-1.amazonaws.com',
]

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
