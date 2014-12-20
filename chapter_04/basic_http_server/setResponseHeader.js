// 組み込みHTTPモジュール
var http = require('http');

// サーバー作成
var server = http.createServer(function(req, res){
	var body = 'hello, world';
	// レスポンスヘッダの設定
	res.setHeader('Content-Length', body.length);
	res.setHeader('Content-type', 'text/plain');
	res.end(body);
});

// ポートへのリクエストの着信を監視する
server.listen(3000);
