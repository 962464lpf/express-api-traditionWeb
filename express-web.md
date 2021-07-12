使用express创建动态web应用

1. 创建服务
2. 创建路由
3. 路由处理函数，使用art-template模板引擎开发web应用
    安装模块 npm install art-template --save  加载 var template = require('art-template');
    1. 读取模板内容 fs.readFile('./views/index.html', 'utf8', (err, templateStr) => {
      2. 读取数据 const todos = []
      3. 渲染
        const ret = template(templateStr, {
          // 模板中使用得数据
          foo: 'bar',
          todos
        })
    })
      4. 模板使用 使用foo数据 遍历todos数据
        <h2>{{foo}}</h2>
        <ul>
          {{each todos}}
          <li>{{$value.title}}</li>
          {{/each}}
        </ul>
  4. 返回结果  res.send(ret)

  使用art-template时需要三步： 读取模板， 读取数据， 渲染数据，为了在express中更好的使用，可以进行配置express

  安装得中间键模板在express官网得资源中

  1. 安装模板引擎
    npm install --save art-template
    npm install --save express-art-template

  2. 安装vue 在html中使用双向绑定

  3. 安装express-session  在服务器端设置session，存储在服务器端，通过cookie发送给客户端，客户端自动携带cookie来验证身份。默认有效时间是本次会话，存储得位置是内存，当会话结束，服务重启，session失效。所系可以选择持久化session

  4. npm install connect-mongo
     session持久化后，即使服务重启，在同一个浏览器关闭后再打开，session也是存在的。除非会话过期


传统web应用中的session验证逻辑：
  1. 在进入应用时，express-session都会给当前会话添加一个connectid，当前的会话中没有用户的相关信息。
  2. 登陆成功会通过req.session.user = user，保存当前用户的特有信息。
  3. 添加一个中间件进行验证session，主要验证session中添加的用户信息。与jwt的验证方式基本一致，都是通过中间件，在需要验证登录状态的路由中添加验证用户中间件。
  4. 用户退出，将session中保存的用户相关信息清空。req.session.user = null
