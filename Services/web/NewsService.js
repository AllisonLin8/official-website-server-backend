const { News, Category } = require('../../db/models')

const {
  newsCleanedDataHelper,
} = require('../../helpers/res-data-cleaned-helper')
const formatDate = require('../../helpers/dayjs-helper')
const { getOffset, getPagination } = require('../../helpers/pagination-helper')

const NewsService = {
  getPaginatedNewsList: async (currentPage, perPage, categoryId, orderBy) => {
    try {
      const options = {
        raw: true,
        nest: true,
        where: { isPublished: true },
        order: [['updatedAt', 'DESC']],
        attributes: { exclude: ['categoryId', 'userId', 'isPublished'] },
        include: [{ model: Category, attributes: ['name'] }],
        offset: getOffset(perPage, currentPage),
        limit: perPage,
      }
      if (categoryId && categoryId !== null)
        options.where = { isPublished: true, categoryId }
      if (orderBy === 'viewCount') options.order = [[orderBy, 'DESC']]
      const newsListByCategory = await News.findAndCountAll(options)
      if (newsListByCategory.hasOwnProperty('count')) {
        const pageInfo = getPagination(
          currentPage,
          perPage,
          newsListByCategory.count
        )
        const cleanedNews =
          newsCleanedDataHelper.clearDataForFindAllAndCount(newsListByCategory)
        return { pageInfo, ...cleanedNews }
      }
      return []
    } catch (error) {
      throw new Error(error)
    }
  },
  getNews: async (id, isDateFormatted) => {
    try {
      const news = await News.findOne({
        raw: true,
        nest: true,
        where: { id, isPublished: true },
        attributes: { exclude: ['categoryId', 'userId', 'isPublished'] },
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
  postNewsViewCount: async news => {
    try {
      const { id, viewCount } = news
      const result = await News.update(
        { viewCount: viewCount + 1 },
        { where: { id }, silent: true }
      )
      if (result[0] === 1) return true
      return false
    } catch (error) {
      throw new Error(error)
    }
  },
  getNewsList: async (length, categoryId, orderBy) => {
    try {
      const options = {
        raw: true,
        nest: true,
        where: { isPublished: true },
        order: [['updatedAt', 'DESC']],
        attributes: { exclude: ['categoryId', 'userId', 'isPublished'] },
        include: [{ model: Category, attributes: ['name'] }],
      }
      if (length && length > 0) options.limit = length
      if (categoryId && categoryId !== null)
        options.where = { isPublished: true, categoryId }
      if (orderBy === 'viewCount') options.order = [[orderBy, 'DESC']]
      const newsList = await News.findAll(options)
      if (newsList.length !== 0) {
        const cleanedNews = newsCleanedDataHelper.clearDataForFindAll(newsList)
        return cleanedNews
      }
      return []
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = NewsService
