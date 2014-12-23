var connect = require('connect');
var app = connect();
app.use(logger);
app.use(hello);
app.listen(3000);

// ロギングを行うミドルウェア
function logger(req, res, next){
	console.log('%s %s', req.method, req.url);
	// nextはこの処理の終了と次の処理の実行許可を与える
	next();
}

// 応答するミドルウェア
function hello (req, res) {
	res.end('Hello world');
}