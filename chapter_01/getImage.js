var http = require('http');
var fs   = require('fs');

http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type' : 'image/jpeg'});
  fs.createReadStream('resource/image.jpg').pipe(res);
}).listen(3000);
