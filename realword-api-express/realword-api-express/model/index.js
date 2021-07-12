const mongoose = require('mongoose');
const {dbUrl} = require('../config/config.default')
// 连接数据库，连接到本地的test数据库
mongoose.connect(dbUrl);

const db = mongoose.connection

db.on('error', (err) => {
    console.log('书路连接失败', err)
})
db.once('open', () => {
    console.log('数据库连接成功')
})

// 组织导出数据模型
module.exports = {
    User: mongoose.model('User', require('./user')),
    Acticle: mongoose.model('Acticle', require('./article'))
}