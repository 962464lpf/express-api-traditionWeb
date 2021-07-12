const express = require('express')
const router = express.Router()
const articleController = require('../controller/article')

// 获取文章
router.get('/', articleController.getArticle)

// 获取关注的用户文章
router.get('/feed', articleController.getFeedArticle)

// 获取单个文章,根据文章id
router.get('/:slug', articleController.getArticleBySlug)

// 创建文章
router.post('/', articleController.createArticle)

// 更新文章，根据文章id
router.put('/:slug', articleController.updateArticleBySlug)

// 删除文章，根据文章id
router.delete('/:slug',articleController.deleteArticleBySlug)

// 给一个文章添加一个评论,根据文章id
router.post('/:slug/comments',articleController.addCommentToArticle )

// 获取一篇文章的评论
router.get('/:slug/comments', )

// 删除文章的评论
router.delete('/:slug/comments/:id', articleController.deleteCommnetBySlug)

// 添加喜欢的文章
router.post('/:slug/favorite', articleController.addFavoriteArticle)

// 取消喜爱的文章
router.delete('/:slug/favorite',articleController.deleteFavoriteArticle)

module.exports = router