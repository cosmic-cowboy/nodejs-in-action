var http = require('http');
var qs = require('querystring');
var items = [];

var server = http.createServer(function (req, res) {
	switch (req.method){
		case 'GET' :
			show(res);
		break ;
		case 'POST' :
			upload(req, res);
		break ;
	}
});

server.listen(3000);

function show (res) {
	var body = '<form action="/" method="post" enctype="multipart/form-data">' +
				'<p><input type="text" name="name"/></p>' +
				'<p><input type="file" name="file"/></p>' +
				'<p><input type="submit" value="Upload"/></p>' +
				'</form>';
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(body));
	res.end(body);
}


function upload (req, res) {
	// body...
}

