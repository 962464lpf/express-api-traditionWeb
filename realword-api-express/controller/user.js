// 引入数据库模型
const { User } = require('../model')
const { Sign } = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
// 用登录
exports.login = async (req, res, next) => {
    // Required fields: email, password
    // 数据验证，在上一个中间件中，验证不通过不会进入到这里
    // 将token发送到客户端
    try {
        // 生成token  使用jwt 
        // console.log(req.user)
        let user = req.user.toJSON()
        delete user.password
        const token = await Sign(user, jwtSecret, { expiresIn: 60 * 60 * 24})
        res.status(200).json({
            ...user,
            token
        })
    } catch (error) {
        next(error)
    }
}

// 用户注册
exports.register = async (req, res, next) => {
    // Required fields: email, username, password
    try {
        // 通过数据库user的数据模型，构建用户自己的数据
        let user = new User(req.body.user)
        //  // 保存
        await user.save()
        user = user.toJSON()
        delete user.password
        res.status(200).json({
            user
        })
    } catch (error) {
        next(error)
    }
}


// 获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId)
        user.toJSON()
        res.status(200).json({ user })
    } catch (error) {
        next(error)
    }
}

// 修改当前用户信息
exports.updateCurrentUser = async (req, res, next) => {
    // Accepted fields: email, username, password, image, bio  非必须
    try {
        res.send('ok')
    } catch (error) {
        next(error)
    }
}