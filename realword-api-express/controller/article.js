const { Article, User } = require('../model')
// 获取文章
exports.getArticle = async (req, res, next) => {
    // ?tag=AngularJS   ?author=jake  ?favorited=jake   ?limit=20 ?offset=0  可选参数
    try {
        const { limit = 2, offset = 0, tagList, username } = req.query
        const filter = {}
        // 根据非必要字段过滤数据，taglist是一个数组，条件是包含就返回
        if (tagList) {
            filter.tagList = tagList
        }
        // 客户端提供得是用户名，数据库中保存得是id
        if (username) {
            const user = await User.findOne({ username })
            filter.author = user ? user._id : null
        }
        // skip 跳过多少条    limit 取多少条 sort排序 排序字段：-1 倒序 1 升序
        let articles = await Article.find(filter)
            .skip((Number.parseInt(limit) * Number.parseInt(offset)))
            .limit(Number.parseInt(limit)).sort({ title: -1 }).populate('author')
        let count = await Article.countDocuments()
        res.status(200).json({
            articles,
            count
        })
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
        const article = await Article.findById(req.params.slug).populate('author')
        // await article
        res.status(200).json({
            article
        })
    } catch (error) {
        next(error)
    }
}

// 创建文章
exports.createArticle = async (req, res, next) => {
    try {
        /**
         * "article": {
                "title": "How to train your dragon",
                "description": "Ever wonder how?",
                "body": "You have to believe",
                "tagList": ["reactjs", "angularjs", "dragons"]
            }
            根据数据模型和前台数据创建数据
            const article = await new Article(res.body.article)
            此时得article没有author，数据模型中得author是必须得，需要从token中获取用户id进行查找
            article.author = req.user.userId
            添加得时候populate映射后需要执行exePopulate，查找的话就不需要
            article.populate('author').exePopulate()   执行映射，实际存储的还是userId
            article.save()
         */
        // 创建文章
        const article = new Article(req.body.article)
        // 添加文章得作者id
        article.author = req.user._id
        // 文章数据库中作者存得是id，将作者id与user表进行映射
        await article.save()
        res.send('ok')
    } catch (error) {
        next(error)
    }
}

// 根据文章slug，更新文章
exports.updateArticleBySlug = async (req, res, next) => {
    try {
        // 对body，description， title进行更改
        const article = req.article
        Object.assign(article,  req.body.article)
        await article.save()
        res.status(200).json({ article: article })
    } catch (error) {
        next(error)
    }
}

// 根据文章slug删除文章
exports.deleteArticleBySlug = async (req, res, next) => {
    try {
        const article = req.article
        await article.remove()
        res.status(200).json({
            message: '删除成功'
        })
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