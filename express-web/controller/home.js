exports.showhome = async (req, res, next) => {
  try {
    res.render('index');
  } catch (error) {
    next(error)
  }
}


exports.showlogin = async (req, res, next) => {
  try {
    req.session.user = {
      name: 'lpfff',
      age: '28' 
    }
    res.render('login', {
      isLogin: true
    })
  } catch (error) {
    next(error)
  }
}

exports.showlogout= async (req, res, next) => {
  try {
    // 清除用户的当前登陆状态
    req.session.user = null
    res.redirect('/')
  } catch (error) {
    next(error)
  }
}

exports.showregister = async (req, res, next) => {
  try {
    req.session.cookie.maxAge = -1
    res.render('login', {
      isLogin: false
    })
  } catch (error) {
    next(error)
  }
}

// 表单自带方法点击登录进行同步验证
exports.register = async (req, res, next) => {
  try {
    const body = req.body
    let error = false
    let errorText = '请输入正确的内容'
    if (body.email && body.username && body.password) {
      error = false
    } else {
      error = true
    }
    res.render('login', {
      isLogin: false,
      error,
      errorText
    })
  } catch (error) {
    next(error)
  }
}

exports.showprofile = async (req, res, next) => {
  try {
    res.render('profile')
  } catch (error) {
    next(error)
  }
}

exports.showsettings = async (req, res, next) => {

  try {
    res.render('settings')
  } catch (error) {
    next(error)
  }
}

exports.showarticle = async (req, res, next) => {

  try {
    res.render('article')
  } catch (error) {
    next(error)
  }
}

exports.showcreateOrEditArticle = async (req, res, next) => {
  try {
    res.render('createOrEditArticle')
  } catch (error) {
    next(error)
  }
}

