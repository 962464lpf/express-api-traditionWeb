exports.register = async (req, res, next) => {
  res.status(200).json({
    data: 123
  })
}