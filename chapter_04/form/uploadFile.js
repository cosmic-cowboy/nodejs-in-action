var http = require('http');
var qs = require('querystring');
var formidable = require('formidable');
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
	if(!isFormData(req)){
		res.statusCode = 400;
		res.end('Bad Request : expecting multipart / form-data');
		return;
	}
	// IncomingFormを初期化して、リクエストオブジェクトをパースする
	// formidableがリクエストのdataイベントにアクセスして解析できるようになる
	var form = new formidable.IncomingForm();

	// 進捗を計算
	form.on('progress', function (byteReceived, byteExpected) {
		var percent = Math.floor(byteReceived / byteExpected * 100);
		console.log("percent:" + percent);
	});

	form.parse(req, function (err, fields, files) {
		console.log("fields:" + fields);
		console.log("files:" + files);
		res.end('upload complete');
	});

}

// マルチパートリクエストであるかを確認する
// Content-Typeヘッダーフィールドが
// multipart/form-dataであるかを確認する
function isFormData (req) {
	var type = req.headers['content-type'] || '';
	return 0 === type.indexOf('multipart/form-data');
}

