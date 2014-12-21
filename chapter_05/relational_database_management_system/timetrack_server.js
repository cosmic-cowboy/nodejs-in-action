var http  = require('http');
var work  = require('./lib/timetrack');
var mysql = require('mysql');

// mysqlに接続
var db = mysql.createConnection({
	host : '127.0.0.1',
	user : 'myuser',
	password : 'mypassword',
	database : 'timetrack'
});

// HTTP リクエストの仕分け（ルーティング）
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