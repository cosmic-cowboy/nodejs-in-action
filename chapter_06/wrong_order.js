var connect = require('connect');

// useメソッドの呼び出し順序を変えることで
// loggerが呼び出されなくなる
connect()
	.use(hello)
	.use(logger)
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