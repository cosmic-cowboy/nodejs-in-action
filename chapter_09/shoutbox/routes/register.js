var User = require('../lib/user');

exports.form = function (req, res) {
	res.render('register', {title : '登録ください'});
};

exports.submit = function (req, res, next) {
	var data = req.body.user;
	User.getByName(data.name, function (err, user) {
		// データベース接続エラー
		if(err) return next(err);

		if(user.id){
			res.error("この名前はすでに登録されています");
			res.redirect('back');
		} else {
			user = new User({
				name : data.name,
				pass : data.pass
			});
			user.save(function (err) {
				if(err) return next(err);
				req.session.uid = user.id;
				res.redirect('/');
			});
		}
	});
};