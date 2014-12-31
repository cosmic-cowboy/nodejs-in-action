var Entry = require('../lib/entry');

exports.list = function (req, res, next) {
	var page = req.page;
	Entry.getRange(page.from, page.to, function (err, entries) {
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