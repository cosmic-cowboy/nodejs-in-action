var connect = require('connect');

// useメソッドは
// Connectアプリケーションのインスタンスを返却するので
// メソッドチェーンでの実行が可能
connect()
	.use(logger)
	.use('/admin', restrict)
	.use('/admin', admin)
	.use(hello)
	.listen(3000);

// 認証を行うミドルウェア
function restrict(req, res, next){
	var authorization = req.headers.authorization;
	if(!authorization) {
		return next(new Error('Unauthorized'));
	}
	var parts = authorization.split(' ');
	var cheme = parts[0];
	var auth = new Buffer(parts[1], 'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];

	authenticateWithDatabase(user, pass, function (err) {
		if(err){
			// エラーが発生したことをディスパッチャに伝える
			return next(err);
		}
		// 証明書が有効であれば引数なしでnextをコールする
		next();
	});
}

// 管理者領域を提供するミドルウェア
function admin(req, res, next){
	switch(req.url){
		case '/' :
			res.end('try /users');
		break;
		case '/users' :
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(['tobi', 'loki', 'jane']));
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

// ヘルパー関数
// 認証
function authenticateWithDatabase(user, pass, callback) {
	var err;
	if (user != 'tobi' || pass != 'ferret') {
		err = new Error('Unauthorized');
	}
	callback(err);
}

