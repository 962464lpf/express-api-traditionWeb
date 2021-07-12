Express
Express是一个快速简单的nodejs应用框架。通过express可以构建一个web应用。
1.接口服务
2.传统的web网站
Express本身是极简仅仅提供web开发的基础功能，但是它通过中间件的集成了其他的一些功能。
基于express生成的框架：
LookBak，Sails，NestJs。

express 创建要给web服务,并进行简单的路由匹配，文件查询,添加，删除

const express = require('express)
cosnt fs = require('fs)
const app = express()

// 配置解析表单请求体
app.use(express.json())
// app.use(express.urlencoded())

// 配置路由
// 获取所有列表
app.use('/todos', async (req, res) => {
    fs.readFile('./db', 'utf8', (err, data) => {
        if (err) {
            // 读取文件失败，设置返回的状态码，返回一个json
            return res.status(500).json({
                err: err
            })
        }
        res.status(200).json(data)
    })
})

// 根据id获取, 可以匹配到路径为/todos/1 的路径1为id
app.get('/todos/:id', (req, res) => {
    // 获取id
    const id = req.params.id
})

// 添加一个数据, 获取请求体内的数据进行添加，这里需要对express实力app进行配置解析请求体
// app.use(express.json())
app.post('/todos', (req, res) => {
    let body = req.body
})

// 添加监听
app.listion(3000, () => {
    console.log('服务已经启动')
})



中间件：
    示例引入
    输出请求的请求日志：req.method  req.url。
    每一个路由都需要进行请求日志的打印时每个路由都需要调用输出日志的方法。这种方法需要抽取封装方法，需要改用原有功能逻辑。这里就需要使用中间件。添加中间件就能在不改变原有方法的逻辑而给路由添加一个可执行的方法。例如 app.use(express.json())解析请求体。

    中间件概念，使用：
    在不改变原有代码的基础上从而增加减少功能，而不改变原有的功能。
    app.use(() => console.log('....')) 给app.use()添加一个回调函数。
    app.use()的回调函数有三个参数，req,res,next.请求/返回/执行下一个函数。

    在express中，中间件就是一个可以访问请求对象，响应对象和调用next方法的一个函数。
    一个路由就相当于一个中间件，在路由处理函数中就含有，req，res，next，next不常用。

    中间件函数可以执行以下任何任务：
        执行任何业务逻辑代码
        修改req，res相应对象，在以后访问req，res的函数中得到的就是修改后的req，res。
        调用下一个中间件（next）

    中间件的分类：
        应用程序级别中间件：
            使用app.use()来进行挂载。
                不关心请求路径： app.use((req, res, next) => {console.log(111) next()})
                关心请求路径：只有当路径一致时才会执行。app.use('/user/:id', (req, res, next) => {console.log(111)  next()})
                限定请求方法，和请求路径：路由  app.get('/user/:id', () => {})
                配置多个处理函数：app.use('/user/:id', (req, res, next) => {next()}, (req, res, next) => {next()})
                同一个请求路径添加多个处理方法。

                next()方法进行传参：next('route')跳过当前路由，然后匹配下一个路由。跳过的是当前路由栈
                中间件也可以使用数组，数组的每一项都是一个处理方法。
        路由级别中间件：
            将于路由相关的代码隔离到一个模块中。
            创建路由实例。
            1. 创建实例
            const express = require('express')
            const router = express.Router()
            2.配置路由
            router.get('/user/:id', (req, res) => {})
            3. 导出
            module.exports = router
            4. 在app.js中挂载
            cosnt router = require('./router.js)
            app.use(router)
            在挂载的时候可以添加路径限制，添加访问前缀
            app.use('/abc', router)
            // app.use('/list',routerlist)   router.get('/:id')  => app.get('/list/:id')
            // app.use('/user',userRouter)   router.get('/:id')  => app.get('/user/:id')
        错误处理中间件
            错误处理始终需要四个参数：err，req, res, next。
             在所有的中间件之后改在错误处理函数:
             app.use((err, req, res, next) => {
                console.log(err)
                res.status(500).json({
                    error: err.message
                })
            })

            处理函数报错
             try {
                    let data = await reqdFileFun()
                    res.status(200).json(data)
            } catch (error) {
                    // res.status(500).json({ error })
                    next(error)
             }
                // next函数传参
                // next() 没有参数表示往后匹配下一个中间件
                // next('route')  参数为route 跳出当前处理函数栈，往后匹配下一个中间件
                // next(error) 其他参数，跳出后续所有的非错误处理路由中间件

            处理404: 在所有路由之后
            app.use((req, res, next) => {
                res.status(404).send('404 not found')
            })

        内置中间件
          挂载在req.body中
            express.json()j解析content-type为application/json格式的请求体。请求体是json。
            express.urlencoded()解析content-type为application/x-www-form-urlencoded格式的请求体。请求体是表单提交形式。  还有multipart/form- data  使用的是formData形式

          很少用
            express.raw()解析content-type为application/octet-stream格式的请求体
            express.text()解析content-type为text格式的请求体
          
            express.static()托管静态资源文件
        第三方中间件




路由路径：
express使用path-to-regexp来匹配路由路径
? 表示可有可无
() 表示一个整体
/a/正则表达式类型
app.use('/ab?cd') => abcd  acd  表示?前的字母可有可无

路由参数
/user/1
app.get('/user/:id', (req,res) => {
    params = {id: id}
    req.params.id
})

/user/aaa-bbb
将请求路径通过-进行分割，前边的放到from这个键中，后边的放到to这个键中
将-换为.就是将.作为分割符

app.get('/user/:from-:to', (req, res) => {
    params = {from: aaa, to: bbb}
    req.params.from    req.from.to
})

对请求参数进行限制
限制id必须为数字，\
app.get('/user/:id(\\d)', (req,res) => {
    req.params.id
})



Restful接口规范：


项目结构：
app.js： 项目入口文件

router文件夹：项目路由
    index.js  路由主文件
    user.js   用户路由
    article.js  文章路由

controller文件夹：路由处理函数
    user.js    用户路由处理函数
    article.js  文章路由处理函数

model文件夹：连接数据库，数据的增删改查
    index.js      将所有的模块组织起来, 数据库连接，将所有的数据模型进行整理导出
    user.js       与用户相关的数据库操作，创建user数据库模型
    article.js    与文章相关的数据库操作
    base-model.js   公用的数据模型
    

middleware文件夹: 自己写的中间件

util文件夹

mongoose数据库：
在model模型中进行创建，在各个模块中进行创建具体的数据模型，在index.js文件中进行导出，在每一个controller文件中进行引入使用。
index.js文件
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

user模块
const mongoose = require('mongoose')

const userSchema = new mongoose.model({
    // mongoose自己添加的验证
    userName: {
        type: String,
        require: true
    }
})

module.exports = userSchema





express中的router模块搭建

app.js文件：
const router = require('./router/index.js')

路由模块index.js文件
使用express.Router()模块构建一个小型的router应用
const express = require('express')
const router = express.Router()
使用各个路由子模块
子模块添加路由前缀/users
router.use('/users', require('./user.js'))
module.exports = router

user路由子模块
const express = require('express')
const router = express.Router()
router.get('/', (req, res) => {})
router.post('/login', (req, res) => {})


使用获取user  localhost:3000/users
注册          localhost:3000/users/login   (post请求)


express-validator: 用于express中的数据验证库，将每一个验证添加到一个中间件中，直接在路由中使用，不影响其他业务逻辑
const {body, validationResult} = require('express-validator')
const {User} = require('../model)
router.post('/login', [
    // 验证参数user中的userName,使用自定义验证查询数据库用户名不能重复
    body('user.userName').notEmpty().widthMessage('用户名不能为空')
        .custom(async userName => {
            const user = User.findOne({userName})
            if (user) {
                // 改变neibupromise状态，返回错误信息
                return Promise.reject('用户名已存在')
            }
    }),
    // 验证email
    body('user.email').notEmpty().widthMessage('邮箱密码不能为空')
        .isEmail().widthMessage('邮箱格式不正确')
        .bail()
        .custom(async email => {
            const user = User.findOne({emial})
            if(user) {
                return Promise.reject('邮箱已注册')
            }
        })
], (req, res, next) => {
    // 处理数据验证结果中间件
    cosnt errors = validationResult(req)
    if (errors.isEmpty()) {
        return res.status(400).json({errors})
    }
    next()
},(req, res, next) => {原有业务逻辑} )

当路由中直接添加验证代码会让路由中的代码冗余，所以使用一个自定义中间件，让中间件来进行验证，路由中只需要添加这个中间件就可以


 
mongoose数据库添加之后使用流程：
1. 数据请求
2. 根据路由进入router模块，根据请求路劲匹配路由
3. 数据验证中间件
4. 根据路由，在controller中使用对应的路由处理函数
5. 在路由处理函数中，获取请求参数等数据，引入model模块中所需的某个数据模型，根据数据模型创建数据，保存数据
6. 返回响应。


用户注册不反悔password
将user转为json，在删除passwor,刚开始的user是mongoose数据库生成的，toJson生成的数据类型自带的方法
user = user.toJson()  此时已经转化为Object
delete user.password  或者 user.password = undefined   
delete 方法比赋值效率低


对用户密码进行加密，nodejs中自带加密形式
const crypto = require(''crypto)
module.exports = str => const result = crypto,.createHash('md5').update(str).digest('nex')

可以在定义数据模型时添加set方法对数据进行加密
 password: {
        type: String,
        require: true,
        // 添加password时进行加密
        set: value => md5(value),
        // 查询时不会数据携带出来
        select: false
    },

生成用户token，基于JWT（json web token）的身份验证
JWT: JSON wEB Token，目前最流行的跨域认证解决方案。
跨域认证问题：
1. 用户向服务器发送用户名密码
2. 服务器验证通过后，在当前会话中保存相关数据，如用户角色，登陆时间等
3. 服务器向用户返回一个sessionid，写入用户的cookie
4. 用户随后每一次请求，都会通过cookie将sessionid传回服务器
5. 服务器收到sessionid，找到当前保存的数据，由此得知用户身份。

这种模式问题在于，扩展性不好，单机没问题，如果是服务器集群，或者蛞蝓的服务器导向架构，就要要求session数据共享，每台服务器都能够读取session。


jwt原理：服务器认证以后，生成一个json，发送给用户。以后，用户与服务端通信的时候都要发回这个json。服务器完全只靠这个对象认定用户身份。为了防止用户篡改数据，服务器在生成这个对象的时候会加上签名。
服务器就不保存任何session数据，也就是说服务器变成了无状态了，从而比较容易实现扩展。

jwt数据结构，他是一个很长的字符串，中间用.分隔成三个部分。注意，jwt内部是没有换行的。
jwt的三个部分依次是：header 头部   payload 负载   signature  签名

header： json对象，描述jwt得元数据，通过base64URL算法转化为字符串
payload：也是一个json对象。通过base64URL算法转化为字符串
signature： 是对前两部分的签名，防止数据篡改。

npm install jsonwebtoken
使用promisify转化生成的可以异步的方法，
生成token const token = await sign(jsonObj, secret)
验证token const decodeToken = await verify(token, secret)

将验证token部分封装为一个中间件，因为多个接口都需要进行验证

用户携带token进行身份验证
获取当前登录得用户，需要携带当前token。
在获取当前登录用户的路由中间件中进行验证token，验证通过在获取用户的路由处理函数中返回当前登录用户。

jwt设置过期时间：jsonwebtoken中sign得第三个参数设置过期时间
expiresIn: 过期时间单位s
jwt.sign(obj,secret, { expiresIn: 60 * 60 })


文章接口:
验证id是否符合mongoose得id格式，自定义验证分为同步验证和异步验证，mongoose.isValidObjectId(value)
同步验证需要返回true，表示成功，是不使用throw Error('error')抛出错误。
异步验证则使用async表示，验证通过则不用返回，异步函数默认返回成功得回调Promise.resolve()，失败则改变promise得状态旧习行。// 异步自定义验证,异步
    param('slug').custom(async value => {
        if (!mongoose.isValidObjectId(value)) {
            return Promise.reject('文章id类型错误')
        }
    })
     // 同步自定义验证
    // param('slug').custom(value => {
    //     console.log(mongoose.isValidObjectId(value))
    //     if (!mongoose.isValidObjectId(value)) {
    //         throw Error('文章类型错误')
    //     }
    //     return true
    // })

对数据进行查找
查找所有 Article.find()
根据字段进行查找 Article.find({title: 1, name: 'lpf'....})
根据id查找 Article.findById(id)
查找一个 Article.findOne({title: 1})

filter: { title: 1, name: 'lpf'}
对查找到的数据进行分页 filter: 筛选条件 skip 跳过多少条     limit 取多少条 sort排序 排序字段：-1 倒序 1 升序
await Article.find(filter)
            .skip((Number.parseInt(limit) * Number.parseInt(offset)))
            .limit(Number.parseInt(limit)).sort({title: -1}).populate('author')




