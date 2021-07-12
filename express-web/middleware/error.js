const {format} = require('util')
module.exports = () => (err, req, res, next) => {
  res.status(500).json({
    err: format(err)
  })
}