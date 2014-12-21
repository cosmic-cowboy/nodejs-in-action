var redis = require('redis');
var client = redis.createClient('6379','127.0.0.1');

// エラーハンドリング
client.on('error',function(err){
	console.log("ERROR : " + err);
});
