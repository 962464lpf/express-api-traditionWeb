const express = require('express')
const controller = require('../controller/home')
const router = express.Router()

const author = require('../middleware/author')

// 渲染页面
router.get('/', controller.showhome)

router.get('/login', controller.showlogin)

router.get('/logout', controller.showlogout)

router.get('/register', controller.showregister)
router.post('/register', controller.register)

router.get('/profile/:id', author, controller.showprofile)

router.get('/settings', author, controller.showsettings)

router.get('/article', author, controller.showarticle)

router.get('/createOrEditArticle', controller.showcreateOrEditArticle)


// 请求接口
router.use('/api', require('./api'))

module.exports = router
