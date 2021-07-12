const jwt = require('jsonwebtoken')
const {promisify} = require('util')

exports.Sign = promisify(jwt.sign)
exports.Verify = promisify(jwt.verify)