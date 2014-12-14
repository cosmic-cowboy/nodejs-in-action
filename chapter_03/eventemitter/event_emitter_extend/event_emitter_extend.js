// 必要なモジュール
var events = require('events');
var util  = require('util');
var fs  = require('fs');

// ディレクトリ指定
var watchDir = './watch';
var processedDir = './done';


// クラスのコンストラクタを作成
function Watcher () {
}

// イベントエミッタの振る舞いを継承

util.inherits(Watcher, events.EventEmitter);
Watcher.prototype = new events.EventEmitter();


// 振る舞いを拡張

// 監視をはじめる
Watcher.prototype.start = function start() {
	var watcher = this;
	fs.watchFile(watchDir, function () {
		watcher.watch();
	});
};

// ファイルを処理するメソッド
Watcher.prototype.watch = function watch() {
	var watcher = this;
	fs.readdir(watchDir, function (err, files) {
		if(err) throw err;
		for(var index in files){
			console.log("watch file : " + files[index]);
			watcher.emit('process', files[index]);
		}
	});
};

module.exports = exports = Watcher;