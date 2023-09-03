const fs = require('fs')

const { ImgurClient } = require('imgur')
const client = new ImgurClient({
  clientId: process.env.IMGUR_CLIENT_ID,
  clientSecret: process.env.IMGUR_CLIENT_SECRET,
  refreshToken: process.env.IMGUR_REFRESH_TOKEN,
})

// 儲存於imgur
const imgurFileHandler = file => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null)
    return client
      .upload({
        image: fs.createReadStream(`${file.path}`),
        type: 'stream',
        album: process.env.IMGUR_ALBUM_ID,
      })
      .then(img => {
        resolve(img ? img.data.link : null)
      })
      .catch(err => reject(err))
  })
}

// 儲存於伺服器
const localFileHandler = file => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null)
    const copyFileName = `upload/${file.originalname}`
    return fs.promises
      .readFile(file.path)
      .then(tempFile => fs.promises.writeFile(copyFileName, tempFile))
      .then(() => {
        resolve(`/${copyFileName}`)
      })
      .catch(err => reject(err))
  })
}

module.exports = {
  localFileHandler,
  imgurFileHandler,
}
