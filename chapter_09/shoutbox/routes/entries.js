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
	// body...
};