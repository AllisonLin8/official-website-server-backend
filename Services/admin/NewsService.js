const { News, Category } = require('../../db/models')

const formatDate = require('../../helpers/dayjs-helper')

const NewsService = {
  getNews: async (id, isDateFormatted) => {
    try {
      const news = await News.findOne({
        raw: true,
        nest: true,
        where: { id },
        attributes: { exclude: ['categoryId'] },
        include: [{ model: Category, attributes: ['name'] }],
      })
      if (news) {
        const formattedNews = {
          ...news,
          category: news.Category.name,
        }
        if (isDateFormatted !== 'false') {
          formattedNews.createdAt = formatDate(formattedNews.createdAt)
          formattedNews.updatedAt = formatDate(formattedNews.updatedAt)
        }
        delete formattedNews.Category
        return formattedNews
      }
      return null
    } catch (error) {
      throw new Error(error)
    }
  },
  getNewsList: async user => {
    try {
      const { id, role } = user
      const whereClause =
        role === 'root' || role === 'editor' ? {} : { userId: id }
      const newsList = await News.findAll({
        raw: true,
        nest: true,
        where: whereClause,
        order: [['updatedAt', 'DESC']],
        attributes: { exclude: ['categoryId'] },
        include: [{ model: Category, attributes: ['name'] }],
      })
      if (newsList.length !== 0) {
        const formattedNews = newsList.map(item => {
          const clearData = {
            ...item,
            createdAt: formatDate(item.createdAt),
            updatedAt: formatDate(item.updatedAt),
            category: item.Category.name,
          }
          delete clearData.Category
          return clearData
        })
        return formattedNews
      }
      return []
    } catch (error) {
      throw new Error(error)
    }
  },
  postNews: async postData => {
    try {
      return await News.create(postData)
    } catch (error) {
      throw new Error(error)
    }
  },
  patchNews: async (id, isPublished) => {
    try {
      const patchedNews = await News.update(
        { isPublished: !isPublished },
        { where: { id } }
      )
      if (patchedNews[0] === 1) return true
      return false
    } catch (error) {
      throw new Error(error)
    }
  },
  putNews: async newData => {
    try {
      const putNews = await News.update(newData, { where: { id: newData.id } })
      if (putNews[0] === 1) return true
      return false
    } catch (error) {
      throw new Error(error)
    }
  },
  deleteNews: async id => {
    try {
      const deleteNews = await News.destroy({ where: { id } })
      if (deleteNews === 1) return true
      return false
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = NewsService
