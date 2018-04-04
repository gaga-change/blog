
exports.usernameAlreadyExist = new Error('用户名已存在')
exports.usernameCheckFlase = new Error('用户名不能为空，且长度最多10位')
exports.passwordChekcFlase = new Error('密码不能为空，长度最小6位，最多15位')