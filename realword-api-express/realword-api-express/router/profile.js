const express = require('express')
const router = express.Router()

// 获取用户文章
router.get('/:username', async (req, res, next) => {
    try {
       
        res.send('ok')
    } catch (error) {
        next(error)
    }
})

// 关注用户
router.post('/:username/follow', async (req, res, next) => {
    try {
       
        res.send('ok')
    } catch (error) {
        next(error)
    }
})

// 取消关注用户
router.delete('/:username/follow', async (req, res, next) => {
    try {
       
        res.send('ok')
    } catch (error) {
        next(error)
    }
})


module.exports = router