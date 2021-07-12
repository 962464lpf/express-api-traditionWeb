const express = require('express')
const controller = require('../controller/api')
const router = express.Router()

router.get('/register', controller.register)

module.exports = router