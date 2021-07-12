const mongoose = require('mongoose')
const baseModel = require('./base-model')
const md5 = require('../util/md5')
const userSchema = new mongoose.Schema({
    // mongoose自己添加的验证
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        // 书库添加password时进行加密
        set: value => md5(value),
        // 查询时不会数据携带出来
        select: false
    },
    bio: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    ...baseModel
})

module.exports = userSchema