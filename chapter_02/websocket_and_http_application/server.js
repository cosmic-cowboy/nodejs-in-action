//////////////////////
// 変数宣言
//////////////////////

// 組み込みhttpモジュール
// HTTPのサーバー／クライアント機能を提供
var http = require('http');

// 組み込みfsモジュール
// ファイルシステム関連の機能を提供
var fs = require('fs');

// 組み込みpathモジュール
// ファイルシステムのパスに関連の機能を提供
var path = require('path');

// アドオンmimeモジュール
// ファイル拡張子に基づいてMIMEタイプを推論する機能を提供
var mime = require('mime');

// ファイル内容を格納するcacheオブジェクト
var cache = {};

//////////////////////
// HTTPサーバー作成
//////////////////////

var server = http.createServer(function(request, response){
	var filePath = false;
	if(request.url === '/'){
		// デフォルトで供給するHTMLファイルの定義
		filePath = 'public/index.html';
	} else {
		// URLパスをファイルの相対パスに変換
		filePath = 'public' + request.url;
	}
	var absPath = './' + filePath;

	// 応答として静的ファイルを供給
	serverStatic(response, cache, absPath);
});

server.listen(3000, function () {
	console.log("server listening on port 3000");
});

var chatServer = require('./lib/chat_server');
chatServer.listen(server);

//////////////////////
// ヘルパー関数
//////////////////////

// 静的ファイルの供給
function serverStatic (response, cache, absPath) {
	// ファイルがメモリにキャッシュされているか
	if(cache[absPath]){
		// メモリからファイルを供給
		sendFile(response, absPath, cache[absPath]);
	} else {
		// ファイル（absPath）が存在するか
		fs.exists(absPath, function(exists) {
			if(exists){
				fs.readFile(absPath, function (err, data) {
					if(err){
						// エラーが発生した場合
						send404(response);
					} else {
						// ディスクから読んだメモリに格納
						cache[absPath] = data;
						// ディスクから読んだファイルを供給
						sendFile(response, absPath, data);
					}
				});
			} else {
				// HTTP 404 応答を送信
				send404(response);
			}
		});
	}
}

// ファイルデータの送信
function sendFile (response, filePath, fileContents) {
	response.writeHead(
		200, {'Content-Type' : mime.lookup(path.basename(filePath))}
	);
	response.end(fileContents);
}

// エラー応答の送信
function send404 (response) {
	response.writeHead(
		404, {'Content-Type' : 'text/plain'}
	);
	response.write('Error 404 : resource not found');
	response.end();
}
