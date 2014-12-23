var parse = require('url').parse;

module.exports = function (obj) {
	
	return function (req, res, next) {
		// 指定されたリクエストメソッドの参照パス群を取得
		var routes = obj[req.method];
		// 指定されたリクエストメソッドに対応する参照パス群がなければ
		// 実行を中止し、次に処理を呼び出す
		if(!routes){
			next();
			return;
		}

		// パス名と照合するためにURLを解析
		var url = parse(req.url);
		// パス群を配列に保存
		var paths = Object.keys(routes);

		for (var i = 0; i < paths.length; i++) {
			var path = paths[i];
			var fn   = routes[path];
			var regPath = path
				.replace(/\//g, '\\/')
				.replace(/:(\w+)/g, '([^\\/]+)');

			var reg = new RegExp('^' + regPath + '$');
			var captures = url.pathname.match(reg);
			if(captures){
				var args = [req, res].concat(captures.slice(1));
				fn.apply(null, args);
				return;
			}
		}
		next();

	};
};