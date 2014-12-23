var connect = require('connect');

// useメソッドは
// Connectアプリケーションのインスタンスを返却するので
// メソッドチェーンでの実行が可能
connect()
	.use(logger)
	.use('/blog', blog)
	.use('/posts', blog)
	.use(hello)
	.listen(3000);

// ブログ記事を提供
function blog(req, res, next){
	switch(req.url){
		case '/today' :
			res.end('today article');
		break;
		default  :
			res.end('coming soon');
		break;
	}
}

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
