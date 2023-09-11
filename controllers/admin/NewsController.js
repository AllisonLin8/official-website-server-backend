const { matchedData } = require('express-validator')

const NewsService = require('../../Services/admin/NewsService')

const { imgurFileHandler } = require('../../utils/imgur')

const NewsController = {
  upload: async (req, res) => {
    const { file } = req
    const filePath = await imgurFileHandler(file)
    if (filePath) {
      res.json({
        status: 'success',
        msg: '上傳圖片成功！',
        imgUrl: filePath,
      })
    } else {
      res.json({
        status: 'error',
        msg: '上傳圖片失敗！',
      })
    }
  },
  postNews: async (req, res) => {
    const { title, content, categoryId } = matchedData(req)

    const { file } = req

    const newData = { title, content, categoryId, isPublished: 0 }

    const filePath = await imgurFileHandler(file)
    if (filePath) newData.cover = filePath

    const news = await NewsService.postNews(newData)
    if (news.toJSON()) {
      res.json({
        status: 'success',
        msg: '案例儲存成功！',
      })
    } else {
      res.json({
        status: 'error',
        msg: '案例儲存失敗！',
      })
    }
  },
}

module.exports = NewsController
