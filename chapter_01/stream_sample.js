var fs = require('fs');

// 読み込みstream
var stream = fs.createReadStream('resource/weather.json');

// イベントリスナを設定
// dataイベント：新しいデータチャンクが準備されるたびに発生するデータイベント
var counter = 0;
stream.on('data', function (chunk) {
	console.log(++counter + "回目：");
	console.log(chunk);
});

// すべてのチャンクのロードが終了したときに発生するデータイベント
stream.on('end', function () {
	console.log('Finish');
});
