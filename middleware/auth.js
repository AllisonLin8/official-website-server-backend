const authenticatedRoot = (req, res, next) => {
  if (req.user && req.user.role === 'root') return next()
  return res.status(403).json({ status: 'error', msg: '使用者權限不足！' })
}

module.exports = {
  authenticatedRoot,
}
