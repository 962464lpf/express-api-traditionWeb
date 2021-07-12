const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const auth = require('../middleware/auth')

// 数据验证中间件
const userVlidator = require('../validate/user')

// 用户登录
router.post('/users/login',userVlidator.login,userController.login)
router.get('/users/login',(req, res) => {
  res.send('hellow')
})

// 用户注册
router.post('/users',userVlidator.register, userController.register)

// 获取当前登录用户, 返回当前登录用户
router.get('/user', auth, userController.getCurrentUser)

// 更新当前登录用户
router.put('/user',  userController.updateCurrentUser)

module.exports = router