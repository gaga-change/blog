
exports.usernameAlreadyExist = new Error('用户名已存在')
exports.usernameCheckFalse = new Error('用户名不能为空，且长度最多10位')
exports.passwordCheckFalse = new Error('密码不能为空，长度最小6位，最多15位')
exports.emailCheckFalse = new Error('请输入正确的邮箱')
exports.loginFail = new Error('用户名或密码错误')
