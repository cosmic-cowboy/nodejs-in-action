var qs    = require('querystring');

// HTML送信、フォーム作成、フォームデータ受信を行うヘルパー関数

// HTML応答を送信
exports.sendHtml = function sendHtml (res, html) {
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);
};

// HTTPのPOSTデータ解析
exports.parseReceivedData = function parseReceivedDataq (req, callback) {
	var body = '';
	req.setEncoding('utf8');
	req.on('data', function (chunk) {
		body += chunk;
	});
	req.on('end', function () {
		var data = qs.parse(body);
		callback(data);
	});
};

// 単純なフォームのレンダリング
exports.actionForm = function (id, path, label) {
	var html = '<form method="POST" action="' + path + '">' +
			'<input type="hidden" name="id" value="' + id + '">' +
			'<input type="submit" value="' + label + '">' +
			'</form>';
	return html;
};

