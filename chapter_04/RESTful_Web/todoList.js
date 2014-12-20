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
	}
});

server.listen(3000);
