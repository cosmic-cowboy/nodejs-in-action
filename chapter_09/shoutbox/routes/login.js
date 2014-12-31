var User = require('../lib/user');

// ログインフォームを表示
exports.form = function (req, res) {
	res.render('login', {title : 'ログイン'});
};

// ログイン認証処理
exports.submit = function (req, res) {
	var data = req.body.user;
	User.authenticate(data.name, data.pass, function (err, user) {
		if(err) return fn(err);

		if(user){
			req.session.uid = user.id;
			// エントリーリストのページにリダイレクト
			res.redirect('/');
		} else {
			res.error("ユーザを確認できませんでした");
			// ログインフォームにリダイレクト
			res.redirect('back');
		}
	});
};

// ログアウト処理
exports.logout = function (req, res) {
	req.session.destroy(function (err) {
		if(err) throw err;
		res.redirect('/');
	});
};


