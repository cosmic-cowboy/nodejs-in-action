var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';


// タスク1 RSSフィードのファイルがあるか
function checkForRssFIle () {
	fs.exists(configFilename, function (exists) {
		if(!exists){
			return next(new Error('Missing RSS file : ' + configFilename));
		}

		next(null, configFilename);
	});
}


// タスク2 ファイルを読み込んで解析
function readRssFile (configFilename) {
	fs.readFile(configFilename, function (err, feedList) {
		if(err){
			return next(err);
		}
		// 読み込んだデータの先頭・最後尾スペースを削除して、一行単位の配列にする
		feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split('\n');
		// 配列からランダムにひとつを選びとる
		var random = Math.floor(Math.random()*feedList.length);

		next(null, feedList[random]);
	});
}

// タスク3 HTTP要求を出して、選択したフィードのデータを取得
function downloadRssFeed (feedUrl) {
	request({uri : feedUrl}, function (err, res, body) {
		if(err) {
			return next(err);
		}
		if(res.statusCode != 200){
			return next(new Error('Abnormal response status code' + feedUrl));
		}
		next(null, body);
	});
}

// タスク4 RSSデータを解析してアイテム配列に入れる
function parseRssFeed (rss) {
	var handler = new htmlparser.RssHandler();
	var parser  = new htmlparser.Parser(handler);
	parser.parseComplete(rss);
	if(!handler.dom.items.length){
		return next(new Error('No RSS items found'));
	}
	var item = handler.dom.items.shift();
	console.log(item.title);
	console.log(item.link);
}

// タスクを実行したい順番で配列に追加
var tasks = [
	checkForRssFIle,
	readRssFile,
	downloadRssFeed,
	parseRssFeed
];

// next関数を呼び出すと次のタスクが実行される
// 第一引数：エラー時にエラー内容を設定、正常時はnullを設定
// 第二引数：正常時に次のメソッドで利用する内容を格納、エラー時は空
function next (err, result) {
	if(err){
		throw err;
	}
	var currentTask = tasks.shift();

	if(currentTask){
		currentTask(result);
	}
}

// タスクのシリアル実行を開始
next();
