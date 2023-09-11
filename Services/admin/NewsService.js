const { News } = require('../../db/models')

const NewsService = {
  postNews: async postData => {
    return await News.create(postData)
  },
}

module.exports = NewsService
