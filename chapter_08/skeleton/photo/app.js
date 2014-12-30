
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var photos = require('./routes/photos');
var http = require('http');
var path = require('path');

var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
// viewファイルを/viewsから供給
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// photosの保管庫
app.set('photos', __dirname + 'public/photos');
// ファビコン
app.use(express.favicon());
// ログ出力
app.use(express.logger('dev'));
// リクエストの解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: './upload'}));

app.use(app.router);
// 静的ファイルを/publicから供給
app.use(express.static(path.join(__dirname, 'public')));

// アプリケーションレベルのsettingsに代入
app.set("title", "My Applicaiton");

// development only
if ('development' == app.get('env')) {
	// 配置後はHTMLエラーページをスタイルつきで表示
  app.use(express.errorHandler());
}

// アプリケーションの経路指定
app.get('/', photos.list);
app.get('/index', routes.index);
app.get('/users', user.list);

app.get('/upload', photos.form);
app.post('/upload', photos.submit(app.get('photos')));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
