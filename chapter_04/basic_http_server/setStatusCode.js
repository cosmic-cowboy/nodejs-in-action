// 組み込みHTTPモジュール
var http = require('http');

var server = http.createServer(function(req, res){
	var url = 'http://google.com';
	var body = '<p>Redirecting to <a href="' + url + '">' + url + '</a></p>';
	res.setHeader('Content-Length', body.length);
	res.setHeader('Content-Type', 'text/html');
	res.statusCode = 302;
	res.end(body);
});

server.listen(3000);

