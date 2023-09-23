const formatDate = require('./dayjs-helper')

const newsCleanedDataHelper = {
  clearDataForFindAll: datalist => {
    return datalist.map(item => {
      const clearData = {
        ...item,
        content: item.content.substring(0, 250) + '...',
        createdAt: formatDate(item.createdAt),
        updatedAt: formatDate(item.updatedAt),
        category: item.Category.name,
      }
      delete clearData.Category
      return clearData
    })
  },
  clearDataForFindAllAndCount: datalist => {
    const { rows } = datalist
    const data = rows.map(item => {
      const clearData = {
        ...item,
        content: item.content.substring(0, 250) + '...',
        createdAt: formatDate(item.createdAt),
        updatedAt: formatDate(item.updatedAt),
        category: item.Category.name,
      }
      delete clearData.Category
      return clearData
    })
    datalist.data = data
    delete datalist.count
    delete datalist.rows
    return datalist
  },
}

const productCleanedDataHelper = {
  clearDataForFindAll: datalist => {
    return datalist.map(item => {
      const clearData = {
        ...item,
        createdAt: formatDate(item.createdAt),
        variety: item.Variety.name,
      }
      delete clearData.Variety
      return clearData
    })
  },
  clearDataForFindAllAndCount: datalist => {
    const { rows } = datalist
    const data = rows.map(item => {
      const clearData = {
        ...item,
        desc: item.desc.substring(0, 250) + '...',
        createdAt: formatDate(item.createdAt),
        variety: item.Variety.name,
      }
      delete clearData.Variety
      return clearData
    })
    datalist.data = data
    delete datalist.count
    delete datalist.rows
    return datalist
  },
}

module.exports = {
  newsCleanedDataHelper,
  productCleanedDataHelper,
}
