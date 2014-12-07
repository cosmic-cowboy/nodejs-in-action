// リクエストイベントを強調
var http = require('http');

var server = http.createServer();
// リクエストのイベントリスナを設定
server.on('request', function(req, res){
  res.writeHead(200, {'Content-Type' : 'text/plain'});
  res.end('Hello World\n');
});

server.listen('3000');
