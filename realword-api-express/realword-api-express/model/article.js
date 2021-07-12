const mongoose = require('mongoose')

const acticleSchema = new mongoose.model({
    // mongoose自己添加的验证
    username: {
        type: String,
        require: true
    }

})

module.exports = acticleSchema