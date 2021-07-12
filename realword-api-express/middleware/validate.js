const { validationResult, buildCheckFunction } = require('express-validator')
const { isValidObjectId } = require('mongoose')

const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ errors: errors.array() });
  };
};
// 导出一个方法validate， export是一个方法validate
exports = module.exports = validate

// 给validate方法中添加一个属性isValidateObjectId,验证id是否符合要求
exports.isValidateObjectId = (location,fields) => {
  return buildCheckFunction(location)(fields).custom(async value => {
    if (!isValidObjectId(value)) {
      return Promise.reject('ID格式错误')
    }
  })
}
