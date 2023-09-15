const { matchedData } = require('express-validator')

const NewsService = require('../../Services/admin/NewsService')

const { imgurFileHandler } = require('../../utils/imgur')

const NewsController = {
  getNews: async (req, res) => {
    try {
      const { newsId } = matchedData(req)
      const isDateFormatted = req.query.isDateFormatted
      const news = await NewsService.getNews(newsId, isDateFormatted)
      if (!news) return res.json({ status: 'error', msg: '該新聞不存在！' })
      return res.json({ status: 'success', msg: '獲取新聞成功！', news })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  getNewsList: async (req, res) => {
    try {
      const news = await NewsService.getNewsList(req.user)
      if (news.length !== 0)
        return res.json({ status: 'success', msg: '獲取所有新聞成功！', news })
      return res.json({ status: 'warning', msg: '目前沒有任何新聞！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  upload: async (req, res) => {
    try {
      const { file } = req

      const filePath = await imgurFileHandler(file)
      if (filePath) {
        return res.json({
          status: 'success',
          msg: '上傳圖片成功！',
          imgUrl: filePath,
        })
      }
      return res.json({ status: 'error', msg: '上傳圖片失敗！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  postNews: async (req, res) => {
    try {
      const { file } = req
      const { id } = req.user
      const { title, content, categoryId } = matchedData(req)
      const newData = { title, content, categoryId, userId: id }

      const filePath = await imgurFileHandler(file)
      if (filePath) newData.cover = filePath

      const news = await NewsService.postNews(newData)
      if (news.toJSON())
        return res.json({ status: 'success', msg: '新聞儲存成功！' })
      return res.json({ status: 'error', msg: '新聞儲存失敗！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  patchNews: async (req, res) => {
    try {
      const { newsId } = matchedData(req)

      const news = await NewsService.getNews(newsId)
      if (!news) return res.json({ status: 'error', msg: '該新聞不存在！' })

      const result = await NewsService.patchNews(newsId, news.isPublished)
      if (result) {
        const msg = !news.isPublished ? '發布成功！' : '取消發布！'
        return res.json({ status: 'success', msg })
      }
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  putNews: async (req, res) => {
    try {
      const { file } = req
      const { id, title, content, categoryId, isPublished, createdAt } =
        matchedData(req)

      const news = await NewsService.getNews(id)
      if (!news) return res.json({ status: 'error', msg: '該新聞不存在！' })

      const newData = { id, title, content, categoryId, isPublished, createdAt }

      const filePath = await imgurFileHandler(file)
      if (filePath) newData.cover = filePath

      const result = await NewsService.putNews(newData)
      if (result) return res.json({ status: 'success', msg: '新聞編輯成功！' })
      return res.json({ status: 'error', msg: '新聞編輯失敗！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  deleteNews: async (req, res) => {
    try {
      const { newsId } = matchedData(req)

      const news = await NewsService.getNews(newsId)
      if (!news) return res.json({ status: 'error', msg: '該新聞不存在！' })

      const result = await NewsService.deleteNews(news.id)
      if (result) return res.json({ status: 'success', msg: '新聞刪除成功！' })
      return res.json({ status: 'error', msg: '新聞刪除失敗！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
}

module.exports = NewsController
