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
  getNews: async (req, res) => {
    const isDateFormatted = req.query.isDateFormatted
    const { newsId } = matchedData(req)
    const news = await NewsService.getNews(newsId, isDateFormatted)
    if (!news) {
      return res.json({
        status: 'warning',
        msg: '該案例不存在！',
      })
    } else {
      return res.json({
        status: 'success',
        msg: '獲取案例成功！',
        news,
      })
    }
  },
  getNewsList: async (req, res) => {
    const news = await NewsService.getNewsList(req.user)
    if (news.length !== 0) {
      return res.json({
        status: 'success',
        msg: '獲取所有案例成功！',
        news,
      })
    } else {
      return res.json({
        status: 'warning',
        msg: '目前沒有任何案例！',
      })
    }
  },
  patchNews: async (req, res) => {
    const { newsId } = matchedData(req)
    const news = await NewsService.getNews(newsId)
    if (!news) {
      return res.json({
        status: 'warning',
        msg: '該案例不存在！',
      })
    }
    const result = await NewsService.patchNews(newsId, news.isPublished)
    if (result) {
      const msg = !news.isPublished ? '發布成功！' : '取消發布！'
      return res.json({
        status: 'success',
        msg,
      })
    }
  },
  deleteNews: async (req, res) => {
    const { newsId } = matchedData(req)
    const news = await NewsService.getNews(newsId)
    if (!news) {
      return res.json({
        status: 'warning',
        msg: '該案例不存在！',
      })
    }
    const result = await NewsService.deleteNews(news.id)
    if (result) {
      return res.json({
        status: 'success',
        msg: '案例刪除成功！',
      })
    }
  },
  putNews: async (req, res) => {
    const { id, title, content, categoryId, isPublished, createdAt } =
      matchedData(req)
    const news = await NewsService.getNews(id)
    if (!news) {
      res.json({
        status: 'error',
        msg: '該案例不存在！',
      })
    }

    const { file } = req

    const newData = { id, title, content, categoryId, isPublished, createdAt }

    const filePath = await imgurFileHandler(file)
    if (filePath) newData.cover = filePath

    const result = await NewsService.putNews(newData)
    if (result) {
      res.json({
        status: 'success',
        msg: '案例編輯成功！',
      })
    } else {
      res.json({
        status: 'error',
        msg: '案例編輯失敗！',
      })
    }
  },
}

module.exports = NewsController
