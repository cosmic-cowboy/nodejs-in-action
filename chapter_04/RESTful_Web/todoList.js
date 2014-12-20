var http = require('http');
// TODOを格納する
var items = [];

var server = http.createServer(function(req, res){
	switch(req.method){
		// リクエストメソッドがPOSTの場合
		case 'POST' :
			var item = '';
			req.setEncoding('utf8');
			req.on('data', function(chunk){
				item += chunk;
			});
			req.on('end', function(){
				// TODOの設置
				items.push(item);
				res.end('OK\n');
			});
		break;

		case 'GET' :
			var body = items.map(function(item, i){
							return i + ')' + item;
						}).join('\n');
			// Content-Lengthを設定することで応答速度を上げる
			res.setHeader('Content-Length', Buffer.byteLength(body));
			res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
			res.end(body);
		break;
	}
});

server.listen(3000);
