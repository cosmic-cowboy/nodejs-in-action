// 組み込みhttpモジュール
var http  = require('http');
// 組み込みファイルシステムモジュール
var fs    = require('fs');
// 組み込みurlモジュール
// parseメソッドを読み込み
var parse = require('url').parse;
// 組み込みpathモジュール
// joinメソッドを読み込み
var join  = require('path').join;

// __dirnameはmagic変数
// このスクリプトファイルと同じディレクトリからの相対参照で静的ファイルを供給
var root = __dirname;

var server = http.createServer(function(req, res){
	// urlを解析
	var url = parse(req.url);
	// ドメイン以下のpathを取得し、ファイルのルートと結合し、
	// 絶対パスを作成
	var path = join(root, url.pathname);
	// fs.ReadStreamを作成
	var stream = fs.createReadStream(path);
	stream.on('data', function (chunk) {
		// ファイルデータを読み込む
		res.write(chunk);
	});
	stream.on('end', function () {
		// ファイルの読み込みが完了したらレスポンスを終了
		res.end();
	});
});

server.listen(3000);
