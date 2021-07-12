const express = require('express')
// 第三方中间件，日志打印中间件
const morgan = require('morgan')
// 引入路由
const router = require('./router/index')
// 加载数据库模块
// require('./model')
// 引入自己的中间件
const errorHandleMiddleware = require('./middleware/errorHandleMiddleware')

const app = express()

// 允许experss解析请求体
app.use(express.json())
app.use(express.urlencoded())

// 添加第三方中间件，日志打印
app.use(morgan('dev'))

// 挂载路由中间件，所有路由以api开头
app.use('/api',router)



// 处理404 
app.use((req, res, next) => {
    res.status(404).send('not found')
})

// 错误处理中间件 在所有的中间件之后改在错误处理函数
app.use(errorHandleMiddleware())

app.listen(3000, () => console.log('服务已经在3000端口启动成功！'))

