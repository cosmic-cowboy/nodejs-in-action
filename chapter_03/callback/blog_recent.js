var http = require('http');
var fs   = require('fs');

// HTTPサーバーを立ち上げ、処理を実装する
var server = http.createServer(function (req, res) {
	// リクエストへの応答
	getTitles(res);
}).listen(8000);

// タイトルを読み込み、リクエストに応答
function getTitles (res) {
	// JSONファイルを非同期で取り出す
	fs.readFile('./titles.json', function (err, data) {
		if(err){
			hasError(err, res);
		} else {
			getTemplate(JSON.parse(data.toString()), res);
		}
	});
}

// テンプレートを取得し、リクエストに応答
function getTemplate (titles, res) {
	// テンプレートを非同期で取り出す
	fs.readFile('./template.html', function (err, data) {
		if(err){
			hasError(err, res);
		} else {
			formatHtml(titles, data.toString(), res);
		}
	});
}

// テンプレートとタイトルからHTMLの成形
function formatHtml(titles, tmpl, res) {
	var html = tmpl.replace('%', titles.join('</li><li>'));
	res.writeHead(200, {'Content-type' : 'text/html'});
	res.end(html);
}

// エラー処理
function hasError(err, res) {
	console.log(err);
	res.end('Server Error');
}
