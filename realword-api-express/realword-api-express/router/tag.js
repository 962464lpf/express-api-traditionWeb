const express = require('express')
const router = express.Router()

// 获取标签
router.get('/', async (req, res, next) => {
    try {
       
        res.send('ok')
    } catch (error) {
        next(error)
    }
})



module.exports = router