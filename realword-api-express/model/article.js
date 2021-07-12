const mongoose = require('mongoose')
const baseModel = require('./base-model')

const acticleSchema = new mongoose.Schema({
    ...baseModel,
    "title": {
        type: String,
        require: true
    },
    "description": {
        type: String,
        require: true
    },
    "body": {
        type: String,
        require: true
    },
    "tagList": {
        type: [String],
        default: null
    },
    favoritesCount: {
        type: Number,
        default: 0
    },
    // 类型是数据库中得一个表，ref得值对应得是具体那个表,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
})

module.exports = acticleSchema