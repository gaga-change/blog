
exports.usernameOrEmailAlreadyExist = new Error('用户名或邮箱已存在')
// exports.usernameCheckFalse = new Error('用户名不能为空，且长度最多10位')
exports.passwordCheckFalse = new Error('密码不能为空，长度最小6位，最多15位')
exports.emailCheckFalse = new Error('请输入正确的邮箱')
exports.urlCheckFalse = new Error('请输入正确的站点')
exports.loginFail = new Error('用户名或密码错误')
exports.placeAlready = new Error('标签以绑定')
// exports.commentOverflow = new Error('评论长度过长')

// 非正常提示
exports.isNull = new Error('参数不能为空')
exports.isEmpty = new Error('参数不能为空字符串')
exports.lengthOverflow = new Error('参数长度异常')
