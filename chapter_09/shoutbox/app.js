
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
var validate = require('./lib/middleware/validate');
var page = require('./lib/middleware/page');
var Entry = require('./lib/entry');
var api = require('./routes/api');

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
// apiにはbasic認証
app.use('/api', api.auth);
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
app.get('/:page?',
	page(Entry.count, 5),
	entries.list);
app.get('/post', entries.form);
app.post('/post',
	validate.require('entry[title]'),
	validate.lengthAbove('entry[title]', 4),
	entries.submit);

// パブリックなREST API
app.get('/api/user/:id', api.user);
app.get('/api/entries/:page?', api.entries);
app.post('/api/entry', api.add);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
