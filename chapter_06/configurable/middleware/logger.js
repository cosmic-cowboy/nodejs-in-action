function setup(format){
	var reqexp = /:(\w+)/g;

	return function logger(req, res, next){
		var str = format.replace(reqexp, function(match, property){
			return req[property];
		});
		console.log(str);
		next();
	};
}

// ミドルウェアコンポーネントはJavaScript関数をexportsしたもの
// これでrequireで読み込めるようになる
module.exports = setup;
