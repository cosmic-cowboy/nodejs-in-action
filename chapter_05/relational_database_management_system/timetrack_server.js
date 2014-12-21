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


