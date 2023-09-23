const getOffset = (perPage, currentPage) => (currentPage - 1) * perPage

const getPagination = (currentPage, perPage, dataCount) => {
  const pageCount = Math.ceil(dataCount / perPage)
  const pageNumArr = Array.from({ length: pageCount }, (_, index) => index + 1)
  currentPage =
    currentPage < 1 ? 1 : currentPage > pageCount ? pageCount : currentPage
  const prev = currentPage - 1 < 1 ? 1 : currentPage - 1
  const next = currentPage + 1 > pageCount ? pageCount : currentPage + 1
  return {
    dataCount,
    pageCount,
    pageNumArr,
    currentPage,
    prev,
    next,
  }
}

module.exports = {
  getOffset,
  getPagination,
}
