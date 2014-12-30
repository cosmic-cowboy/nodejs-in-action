
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
// viewファイルを/viewsから供給
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// ファビコン
app.use(express.favicon());
// ログ出力
app.use(express.logger('dev'));
// リクエストの解析
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
// 静的ファイルを/publicから供給
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	// 配置後はHTMLエラーページをスタイルつきで表示
  app.use(express.errorHandler());
}

// アプリケーションの経路指定
app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
