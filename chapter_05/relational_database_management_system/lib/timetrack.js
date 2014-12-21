var qs    = require('querystring');

// HTML送信、フォーム作成、フォームデータ受信を行うヘルパー関数

// HTML応答を送信
exports.sendHtml = function sendHtml (res, html) {
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);
};

// HTTPのPOSTデータ解析
exports.parseReceivedData = function parseReceivedData (req, callback) {
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
exports.actionForm = function actionForm (id, path, label) {
	var html = '<form method="POST" action="' + path + '">' +
			'<input type="hidden" name="id" value="' + id + '">' +
			'<input type="submit" value="' + label + '">' +
			'</form>';
	return html;
};

// RDBMSへのCRUD
// 作業日報の追加
exports.add = function add (db, req, res) {
	// POSTデータの解析
	parseReceivedData(req, function (work) {
		db.query(
			"INSERT INTO work (hours, date, description) " +
			" VALUES (?, ?, ?)",
			[work.hours, work.date, work.description],
			function (err) {
				if(err) throw err;
				// 作業日報リストを表示
				show(db, res);
			}
		);
	});
};

// 作業日報の削除
exports.del = function del (db, req, res) {
	// POSTデータの解析
	parseReceivedData(req, function (work) {
		db.query(
			"DELETE FROM work WHERE id = ?",
			[work.id],
			function (err) {
				if(err) throw err;
				// 作業日報リストを表示
				show(db, res);
			}
		);
	});
};

// 作業日報のアーカイブ化
exports.archive = function archive (db, req, res) {
	// POSTデータの解析
	parseReceivedData(req, function (work) {
		db.query(
			"UPDATE work SET archived=1 id = ?",
			[work.id],
			function (err) {
				if(err) throw err;
				// 作業日報リストを表示
				show(db, res);
			}
		);
	});
};

exports.show = function show (db, res, showArchived) {
	var query = "SELECT * FROM work " +
			" WHERE archived=? " +
			" ORDER BY date DESC ";
	var archiveValue = (showArchived) ? 1 : 0;
	db.query(
		query,
		[archiveValue],
		function (err, rows) {
			if(err) throw err;
			html = (showArchived) ? '' : '<a href="/archived">Archived Work}<br/>';
			html += exports.workHitlistHtml(rows);
			html += exports.workFromHtml();
			exports.sendHtml(res, html);
		}
	);
};

exports.workHitlistHtml = function workHitlistHtml(){

};

exports.workFromHtml = function workFromHtml(){

};