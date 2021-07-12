const {Verify} = require('../util/jwt')
const {jwtSecret} = require('../config/config.default')
module.exports = async (req, res, next) => {
    // 从请求头中获取token
    // 验证token是否有效
    // 无效 发送401
    // 有效 将用户信息挂载到req中，继续执行下一个中间件
    let token = req.headers.token
    token = token ? token.split('token ')[1] : ''
    if (!token) {
        return res.status(401).end('无权限')
    }
    try {
        // 如果token不正确就不能通过jwtSecert的解析
        const decodeToken = await Verify(token, jwtSecret)
        req.user = decodeToken
        next()
    } catch (error) {
        return res.status(401).end('无权限')
    }
   
}