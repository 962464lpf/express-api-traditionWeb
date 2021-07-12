// 与用户相关的数据验证
const { body, param } = require('express-validator')
// 数据验证中间件
const validate = require('../middleware/validate')
const mongoose = require('mongoose')
const { Article, User } = require('../model')


exports.createArticle = validate([
    body('article.title').notEmpty().withMessage('标题不能为空'),
    body('article.description').notEmpty().withMessage('description不能为空'),
    body('article.body').notEmpty().withMessage('body不能为空'),
])

exports.getArticle = validate([
    // 验证查询参数，不是请求体中得参数,验证文章id必须符合mongoose得格式
    // 异步自定义验证
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

    // 封装
    // validate.isValidateObjectId(['params'], 'slug')
])

// 更新文章
exports.updateArticles = [
    // 验证id是否符合格式,封装过的
    validate([
        validate.isValidateObjectId(['params'], 'slug')
    ]),

    // 校验文章是否存在
    async (req, res, next) => {
        const slug = req.params.slug
        const article = await Article.findById(slug)
        if (!article) {
            return res.status(404).json({ error: 'id不存在' })
        }
        req.article = article
        next()
    },

    // 校验文章作者是否是当前登录用户
    async (req, res, next) => {
        const user = req.user
        // 通过数据库查出来的id为Object类型
        if (user._id.toString() !== req.article.author.toString()) {
            return res.status(401).json({
                error: '您没有权限修改此文章'
            })
        }
        next()
    }
]

// 删除文章验证
exports.delterArticles = exports.updateArticles
