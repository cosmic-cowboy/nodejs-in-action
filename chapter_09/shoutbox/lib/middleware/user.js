var User = require('../user');

module.exports = function (req, res, next) {
	// ログインしたユーザのIDをセッションから取得
	var uid = req.session.uid;
	if (!uid) return next();
	// ユーザの情報をRedisから取得
	User.get(uid, function (err, user) {
		if(err) return next(err);
		// ユーザ情報をレスポンスオブジェクトに
		// パスワード情報も入っているのでは？
		req.user = res.locals.user = user;
		next();
	});
};