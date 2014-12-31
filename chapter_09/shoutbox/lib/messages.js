var express = require('express');

// Expressがレスポンスオブジェクトに使うプロトタイプ
// このオブジェクトはすべてのミドルウェアおよび経路から利用できる
var res = express.response;

res.message = function (msg, type) {
	type = type || 'info';
	// セッション取得
	var session = this.req.session;
	// セッションにメッセージを登録
	session.messages = session.messages || [];
	session.messages.push({type : type, string : msg});
};


// error関数をオーバーライド
// error型のメッセージをメッセージキューに追加する
res.error = function (msg) {
	return this.message(msg, 'error');
};

// ミドルウェア作成
// res.locals.messages に req.session.messages を代入
// 代入後の削除処関数もあわせて宣言
module.exports = function (req, res, next) {
	res.locals.messages = req.session.messages || [];
	res.locals.removeMessages = function () {
		req.session.messages = [];
	};
	next();
};

