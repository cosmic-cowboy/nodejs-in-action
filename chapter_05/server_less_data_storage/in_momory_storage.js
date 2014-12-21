var http = require('http');
var counter = 0;

var server = http.createServer(function(req, res){
	// 理由はわからないが
	// chromeで実行するとリクエストが２回呼び出される
	counter++;
	console.log(counter);
	res.write('I have been accessed ' + counter + ' times.');
	res.end();
});

server.listen(3000);
