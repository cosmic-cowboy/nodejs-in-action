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

// ハッシュマップでの保存
client.hmset('camping', {
	'shelter' : '2-person tent',
	'cooking' : 'campstove'
}, redis.print);

// キーを指定した取り出し
client.hget('camping', 'cooking', function (err, value){
	if(err) throw err;
	console.log('will be cooking with : ' + value);
});

// ハッシュマップ内のデータを取り出し
client.hkeys('camping', function (err, keys) {
	if(err) throw err;
	keys.forEach(function (key, i) {
		console.log(i + ': ' + key);
	});
});