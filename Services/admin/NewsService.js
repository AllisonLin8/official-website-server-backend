const { News, Category } = require('../../db/models')

const formatDate = require('../../helpers/dayjs-helper')

const NewsService = {
  postNews: async postData => {
    return await News.create(postData)
  },
  getNews: async (id, isDateFormatted) => {
    const news = await News.findOne({
      where: { id },
      attributes: { exclude: ['categoryId'] },
      include: [{ model: Category, attributes: ['name'] }],
      raw: true,
      nest: true,
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
    return false
  },
  getNewsList: async user => {
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
  },
  patchNews: async (id, isPublished) => {
    const patchedNews = await News.update(
      { isPublished: !isPublished },
      { where: { id } }
    )
    if (patchedNews[0] === 1) return true
  },
  deleteNews: async id => {
    const result = await News.destroy({ where: { id } })
    if (result === 1) return true
  },
  putNews: async newData => {
    const result = await News.update(newData, {
      where: { id: newData.id },
    })
    if (result[0] === 1) return true
  },
}

module.exports = NewsService
