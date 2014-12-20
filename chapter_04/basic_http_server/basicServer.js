//組み込みHTTPモジュール
var http = require('http');

// サーバー作成
// 応答データをソケットに書いてレスポンスを終了する
var server = http.createServer(function(req,res){
	res.end('hello, world');
});

// ポートへのバインド
// リクエストの着信を監視する
server.listen(3000);
