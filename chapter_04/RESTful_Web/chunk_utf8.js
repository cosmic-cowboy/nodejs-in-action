var http = require('http');

var server = http.createServer(function(req, res){
	// ストリームのエンコードをUTF8に
	// チャンクの単位がbuffer array（バイト配列）からUTF8に変わる
	req.setEncoding('utf8');
	// dataイベント
	// データの新しいチャンクが読み込まれるごとに発火する
	req.on('data', function(chunk){
		console.log('parsed', chunk);
		
	});
	// endイベント
	// すべてのデータが読み終わった時に発火する
	req.on('end', function(chunk){
		console.log('done parsing');
		res.end();
	});
});

server.listen(3000);
