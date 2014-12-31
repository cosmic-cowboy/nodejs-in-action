var Entry = require('../lib/entry');

exports.list = function (req, res, next) {
	Entry.getRange(0, -1, function (err, entries) {
		if(err) return next(err);

		res.render('entries', {
			title : 'エントリーリスト',
			entries : entries
		});
	});
};

exports.form = function (req, res, next) {
	res.render('post', {title:'記事投稿'});
};
exports.submit = function (req, res, next) {
	var data = req.body.entry;

	if(!data.title){
		res.error("タイトルを入力してください");
		res.redirect('back');
		return;
	}
	if(data.title.length < 4){
		res.error("タイトルは四文字以上で入力してください");
		res.redirect('back');
		return;
	}

	var entry = new Entry({
		username : res.locals.user.name,
		title : data.title,
		body : data.body
	});

	entry.save(function (err) {
		if(err) return next(err);
		res.redirect('/');
	});
};