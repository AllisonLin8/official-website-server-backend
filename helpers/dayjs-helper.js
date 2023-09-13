const dayjs = require('dayjs')

const formatDate = date => {
  const dayjsObj = dayjs(date)
  const formattedDate = dayjsObj.format('MM-DD-YYYY HH:mm')
  return formattedDate
}

module.exports = formatDate
