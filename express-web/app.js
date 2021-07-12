const express = require('express')
const router = require('./router/index')
const path = require('path')
const errorMiddleWare = require('./middleware/error')
// 服务器端生成session，通过cookie发送给客户端，客户端自动通过cookie携带session，验证客户信息
const session = require('express-session')
// session持久化
const MongoStore = require('connect-mongo');
const { sessionSecret } = require('./config/base_config')
const app = express()


// 允许experss解析请求体
app.use(express.json())
app.use(express.urlencoded())

// 服务端生成session，通过cookie发送给客户端，客户端直接通过req.session.名称进行获取
// 数据默认实是在内存中存储
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  // 默认的cookie是本次会话，每次会话都会重置
  cookie: {
    maxAge: 1000 * 60 * 30
    // 设置cookie时间单位ms， maxAge: 1000 * 60 
    // secure: true // 设定https协议下生效
  },
  // session持久化到mongodb，以后只要session没有过期，就剋在req.session中得到保存的数据
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/realworld'
  })
}))

// 给app添加统一的模板数据
app.use((req, res, next) => {
  app.locals.sessionUser = req.session.user
  next()
})




// 设置模板引擎  第一个参数为文件的后缀名，第二个参数为模板模块
app.engine('html', require('express-art-template'));
// 设置模板的参数
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
});
// 设置模板的位置，第一个参数为views必须为views，第二个为模板文件夹路径
app.set('views', path.join(__dirname, 'views'));
// 设置在渲染的时候不用谢后缀名
app.set('view engine', 'html')

// 托管静态资源,请求直接在/css下请求
app.use('/public', express.static(path.join(__dirname, './public')))
// 添加访问前缀,以/public为前缀的路径在public文件夹中获取
// app.use('/public', express.static(path.join(__dirname, './public')))
// 多个静态资源路径时，最好加上前缀
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))



// 设置路由
app.use(router)
// 处理404 
app.use((req, res, next) => {
  res.status(404).send('not found')
})

// 错误处理中间件 在所有的中间件之后改在错误处理函数
app.use(errorMiddleWare())

console.log(app._router)

app.listen(3001, () => {
  console.log('服务已经在3001端口已启动')
})