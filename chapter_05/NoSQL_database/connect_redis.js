var redis = require('redis');
var client = redis.createClient();

// エラーハンドリング
client.on('error',function(err){
	console.log("ERROR : " + err);
});

// キーペアでの保存
client.set('color', 'red', redis.print);

// キーペアでの取り出し
client.get('color', function (err, value) {
	if(err) throw err;
	console.log("Got : " + value);
});