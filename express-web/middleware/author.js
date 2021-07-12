module.exports = async (req, res, next) => {
  const sessionUser = req.session.user
  if (sessionUser) return next()
  res.redirect('/login')
}