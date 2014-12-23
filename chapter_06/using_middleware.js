var connect = require('connect');

// useメソッドは
// Connectアプリケーションのインスタンスを返却するので
// メソッドチェーンでの実行が可能
connect()
	.use(logger)
	.use(hello)
	.listen(3000);

// ロギングを行うミドルウェア
function logger(req, res, next){
	console.log('%s %s', req.method, req.url);
	// nextはこの処理の終了と次の処理の実行許可を与える
	next();
}

// 応答するミドルウェア
// 
function hello (req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello world');
}