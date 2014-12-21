var redis = require('redis');
var client = redis.createClient();

// エラーハンドリング
client.on('error',function(err){
	console.log("ERROR : " + err);
});

///////////////////////
//////  キーペア  //////
///////////////////////
// キーペアでの保存
client.set('color', 'red', redis.print);

// キーペアでの取り出し
client.get('color', function (err, value) {
	if(err) throw err;
	console.log("Got : " + value);
});

///////////////////////
///   ハッシュマップ   ///
///////////////////////
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

///////////////////////
//////   リスト   //////
///////////////////////
// リストでの保存
client.lpush('tasks', 'Paint the bikeshed red. ', redis.print);
client.lpush('tasks', 'Paint the bikeshed green. ', redis.print);

// リストの取り出し
// lrangeは指定された範囲のデータを取り出す
// 0は起点、-1の場合はリストの最後の項目を表す
// 下記の指定ではすべてのデータを取得する
client.lrange('tasks', 0, -1, function(err, items){
	if(err) throw err;
	items.forEach(function (item, i) {
		console.log(i + ': ' + item);
	});
});

