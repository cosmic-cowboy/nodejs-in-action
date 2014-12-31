module.exports = function (fn, perpage) {
	perpage = perpage || 10;
	return function (req, res, next) {
		// リクエストのパラメータに設定されたpageの値を取得
		// パラメータにpageがなければ、1
		// パラメータにpageがあれば、その値を10進数の数字に変換
		// パラメータのpageが0やマイナスだった場合、1
		// その結果から-1した数がpageとなる
		var page = Math.max(
			parseInt(req.param('page') || '1', 10),
			1
		) - 1;


		fn(function (err, total) {
			if(err) return next(err);
			// リクエストのpageプロパティにpagerで利用する値を代入
			req.page = res.locals.page = {
				number : page,
				perpage : perpage,
				from : page * perpage,
				to   : page * perpage + perpage - 1,
				total : total,
				count : Math.ceil(total / perpage)
			};
			next();
		});

	};
};