// 引入数据库模型
// const {User} = require('../model')
// const { delete } = require('../router/users')
// 用登录
exports.login = async (req, res, next) => {
    // Required fields: email, password
    // 数据验证，在上一个中间件中，验证不通过不会进入到这里
    // 生成token  使用jwt
    // 将token发送到客户端
    try {
      res.status(200).json({
          user: req.body.user
      })
    } catch (error) {
        next(error)
    }
}

// 用户注册
exports.register = async (req, res, next) => {
    // Required fields: email, username, password
    try { // 1. 获取请求体数据
         // 1. 获取请求体数据
         console.log(req.body.email, req.body.password)
         
         
         // 通过数据库user的数据模型，构建用户自己的数据
        //  const user = new User(req.body)
        //  // 保存
        //  await user.save()
        // //  返回时不懈怠password
        // user.toJson()
        // delete user.password
         res.status(200).json({
             user: req.body
         })
    } catch (error) {
        next(error)
    }
}

// 获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
    try {
        res.send('ok')
    } catch (error) {
        next(error)
    }
}

// 修改当前用户信息
exports.updateCurrentUser =  async (req, res, next) => {
    // Accepted fields: email, username, password, image, bio  非必须
    try {
        res.send('ok')
    } catch (error) {
        next(error)
    }
}