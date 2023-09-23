const { matchedData } = require('express-validator')

const NewsService = require('../../Services/web/NewsService')

const NewsController = {
  getPaginatedNewsList: async (req, res) => {
    try {
      const { currentPage, perPage, categoryId, orderBy } = req.query
      const news = await NewsService.getPaginatedNewsList(
        currentPage ? Number(currentPage) : 1,
        perPage ? Number(perPage) : 10,
        categoryId ? Number(categoryId) : null,
        orderBy
      )
      if (news.hasOwnProperty('data'))
        return res.json({ status: 'success', msg: '獲取所有新聞成功！', news })
      return res.json({ status: 'warning', msg: '目前沒有任何新聞！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  getNews: async (req, res) => {
    try {
      const { id } = matchedData(req)
      const isDateFormatted = req.query.isDateFormatted
      const news = await NewsService.getNews(id, isDateFormatted)
      if (!news) return res.json({ status: 'error', msg: '該新聞不存在！' })
      return res.json({ status: 'success', msg: '獲取新聞成功！', news })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  postNewsViewCount: async (req, res) => {
    try {
      const { id } = matchedData(req)
      const news = await NewsService.getNews(id)
      if (!news) return res.json({ status: 'error', msg: '該新聞不存在！' })
      const result = await NewsService.postNewsViewCount(news)
      if (result)
        return res.json({ status: 'success', msg: '新聞點閱次數增加成功！' })
      return res.json({ status: 'error', msg: '新聞點閱次數增加失敗！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
  getNewsList: async (req, res) => {
    try {
      const { length, categoryId, orderBy } = req.query
      const news = await NewsService.getNewsList(
        length ? Number(length) : null,
        categoryId ? Number(categoryId) : null,
        orderBy
      )
      if (news.length !== 0) {
        return res.json({ status: 'success', msg: '獲取所有新聞成功！', news })
      }
      return res.json({ status: 'warning', msg: '目前沒有任何新聞！' })
    } catch (error) {
      res.json({ status: 'error', msg: '發生未知錯誤，請稍後再試！' })
      return console.error(error)
    }
  },
}

module.exports = NewsController
