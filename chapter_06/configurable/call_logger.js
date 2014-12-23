var connect = require('connect');
var logger = require('./middleware/logger');

// useメソッドは
// Connectアプリケーションのインスタンスを返却するので
// メソッドチェーンでの実行が可能
connect()
	.use(logger(':method :url'))
	.use(hello)
	.listen(3000);

// 応答するミドルウェア
// 
function hello (req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello world');
}
