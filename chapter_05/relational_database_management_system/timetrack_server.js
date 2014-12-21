var http  = require('http');
var work  = require('./lib/timetrack');
var mysql = require('mysql');

// HTTP リクエストの仕分け（ルーティング）
// ※ルーティング部分はモジュール化した方が良い
var server = http.createServer(function (req, res) {
	switch(req.method){
		// HTTP POSTリクエストの処理手順
		case 'POST' :
			switch(req.url){
				case '/' :
					work.add(db, req, res);
				break;
				case '/archive' :
					work.archive(db, req, res);
				break;
				case '/delete' :
					work.delete(db, req, res);
				break;
			}
		break;

		// HTTP GETリクエストの処理手順
		case 'GET' :
			switch(req.url){
				case '/' :
					work.show(db, res);
				break;
				case '/archive' :
					work.showArchived(db, res);
				break;
			}
		break;
	}
});

//////////////////////
/////  mysql関連  /////
//////////////////////
// ※モジュール化した方が良い

// mysqlに接続
var db = mysql.createConnection({
	host : '127.0.0.1',
	user : 'myuser',
	password : 'mypassword',
	database : 'timetrack'
});

// データベーステーブル作成
db.query(
	"CREATE TABLE IF NOT EXISTS work (" +
	" id INT(10) NOT NULL AUTO_INCREMENT, " +
	" hours DECIMAL(5,2) DEFAULT 0, " +
	" date DATE, " +
	" archived INT(1) DEFAULT 0, " +
	" description LONGTEXT, " +
	" PRIMARY KEY(id)) ",
	function (err) {
		if(err) throw err;
		console.log('Server started...');
		// HTTPサーバー起動
		server.listen(3000, '127.0.0.1');
	}
);
