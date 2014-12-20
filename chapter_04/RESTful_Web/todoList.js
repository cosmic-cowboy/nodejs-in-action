var http = require('http');
// urlの解析
var url = require('url');
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

		case 'DELETE' :
			var path = url.parse(req.url).pathname;
			var itemNum = parseInt(path.slice(1), 10);

			if(isNaN(itemNum)){
				// 数値として有効か
				res.statusCode = 400;
				res.end('Invalid item id');
			} else if(!items[itemNum]){
				// 指定された番号が配列にあるか
				res.statusCode = 404;
				res.end('Item not found');
			} else {
				// 指定された番号のTODOを削除
				items.splice(itemNum, 1);
				res.end('OK\n');
			}
		break;
	}
});

server.listen(3000);
