// 与用户相关的数据验证
const { body } = require('express-validator')
const { User } = require('../model')
// 数据验证中间件
const validate = require('../middleware/validate')
// 用户加密方法
const md5 = require('../util/md5')

// 登录有关的验证中间件 Required fields: email, password,中间件返回的是一个数组或一个方法
exports.login = [
	// 验证基本数据存在在进行数据库层面的验证
	validate([
		body('user.email').notEmpty().withMessage('邮箱不能为空').isEmail().withMessage('邮箱格式不正确'),
		body('user.password').notEmpty().withMessage('密码不能为空')
	]),
	// 数据库层面的验证邮箱，存在说明已经注册
	validate([
		body('user.email').custom(async (email, { req }) => {
			// 数据库设置了密码不能获取，需要设置可以获取密码
			const user = await User.findOne({email}).select(['password', 'username'])
			if (!user) {
				return Promise.reject('用户不存在')
			}
			// 用户存在将用户保存到req中，在查询密码时就不用在查询数据库
			req.user = user
		})
	]),
	// 用户已经注册，验证密码是否正错
	validate([
		body('user.password').custom(async (password, { req }) => {
			if (md5(password) !== req.user.password) {
				return Promise.reject('密码错误')
			}
		})
	])

]

// 注册有关的验证中间件
exports.register = [
	validate([
		body('user.username').notEmpty().withMessage('用户名不能为空'),
		body('user.email').notEmpty().withMessage('邮箱不能为空').isEmail().withMessage('邮箱格式不正确')
	]),
	validate([
		// 验证username,email是否重复
		body('user.username').custom(async (username, { req }) => {
			const user = await User.findOne({ username })
			if (user) {
				return Promise.reject('用户名已存在')
			}
			console.log(user, 'username')
		}),
	]),
	validate([
		// 验证email是否重复
		body('user.email').custom(async (email, { req }) => {
			const user = await User.findOne({ email })
			if (user) {
				return Promise.reject('邮箱已注册')
			}
		}),
	])
]


