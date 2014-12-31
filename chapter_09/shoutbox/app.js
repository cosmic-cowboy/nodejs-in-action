
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var register = require('./routes/register');
var login = require('./routes/login');
var entries = require('./routes/entries');
var http = require('http');
var path = require('path');
var midUser = require('./lib/middleware/user');
var messages = require('./lib/messages');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret here' }));

// ミドルウェアとして登録
app.use(midUser);
app.use(messages);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ユーザー登録の経路を追加
app.get('/register', register.form);
app.post('/register', register.submit);
// ユーザーログイン・ログアウトの経路を追加
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);
// エントリーの関する経路の追加
app.get('/', entries.list);
app.get('/post', entries.form);
app.post('/post',
	requireEntryTitle,
	requireEntryTitleLengthAbove(4),
	entries.submit);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function requireEntryTitle (req, res, next) {
	var title = req.body.entry.title;
	if(title){
		next();
	} else {
		res.error("タイトルを入力してください");
		res.redirect('back');
		return;
	}
}

function requireEntryTitleLengthAbove(len){
	return function (req, res, next) {
		var title = req.body.entry.title;
		if(title.length > 4){
			next();
		} else {
			res.error("タイトルは四文字以上で入力してください");
			res.redirect('back');
			return;
		}
	};
}