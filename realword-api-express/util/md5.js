// 加密
const crypto = require('crypto')
module.exports = (str) => {
    const result = crypto.createHash('md5').update(str).digest('hex')
    return result
}