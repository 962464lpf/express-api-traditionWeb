// 获取文章
exports.getArticle = async (req, res, next) => {
    // ?tag=AngularJS   ?author=jake  ?favorited=jake   ?limit=20 ?offset=0  可选参数
    try {
       
        res.send('ok')
    } catch (error) {
        next(error)
    }
}

// 获取关注的文章
exports.getFeedArticle = async (req, res, next) => {
    //  ?limit=20 ?offset=0  可选参数  需要登录
    try {
       
        res.send('ok')
    } catch (error) {
        next(error)
    }
}

// 根据文章id获取文章
exports.getArticleBySlug = async (req, res, next) => {
    // params.slug
    try {
       
        res.send('ok')
    } catch (error) {
        next(error)
    }
}

// 创建文章
exports.createArticle = async (req, res, next) => {
    // Required fields: title, description, body  
    // Optional fields: tagList as an array of Strings
    try { 
       
        res.send('ok')
    } catch (error) {
        next(error)
    }
}

// 根据文章slug，更新文章
exports.updateArticleBySlug =  async (req, res, next) => {
    // 需要验证 Optional fields: title, description, body
    
    try { 
       
        res.send('ok')
    } catch (error) {
        next(error)
    }
}

// 根据文章slug删除文章
exports.deleteArticleBySlug =  async (req, res, next) => {
    // 需要验证  params.slug
    
    try { 
       
        res.send('ok')
    } catch (error) {
        next(error)
    }
}

// 根据文章slug给文章添加一个评论
exports.addCommentToArticle = async (req, res, next) => {
    // 需要验证 Required field: body  params.slug
    
    try { 
       
        res.send('ok')
    } catch (error) {
        next(error)
    }
}

// 根据文章slug获取文章的评论
exports.getCommentBySlug = async (req, res, next) => {
    // 需要验证 
    
    try { 
       
        res.send('ok')
    } catch (error) {
        next(error)
    }
}

// 删除文章的评论,根据文章slug， 评论id
exports.deleteCommnetBySlug = async (req, res, next) => {
    // 需要验证 Required
    
    try { 
       
        res.send('ok')
    } catch (error) {
        next(error)
    }
}

// 添加喜欢的文章
exports.addFavoriteArticle = async (req, res, next) => {
    // 需要验证  params.slug
    
    try { 
       
        res.send('ok')
    } catch (error) {
        next(error)
    }
}

// 取消喜爱的文章
exports.deleteFavoriteArticle = async (req, res, next) => {
    // 需要验证 Required field: body   params.slug
    
    try { 
       
        res.send('ok')
    } catch (error) {
        next(error)
    }
}