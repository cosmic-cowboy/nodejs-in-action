var net = require('net');
var redis = require('redis');

var chat_room = 'main_chat_room';

var server = net.createServer(function(socket){
	var subscriber;
	var publisher;

	socket.on('connect', function(){
		// 各ユーザの登録者クライアントを作成
		subscriber = redis.createClient();
		// チャンネルに登録
		subscriber.subscribe(chat_room);

		// チャンネルからメッセージが届いたらユーザに表示
		subscriber.on('message', function (channel, message) {
			socket.write('Channel ' + channel + ': ' + message);
		});

		// 各ユーザの発行者クライアントを作成
		publisher = redis.createClient();
	});

	// ユーザがメッセージを入力したら、各ユーザに発行
	socket.on('data', function(data){
		publisher.publish(chat_room, data);
	});

	// 接続が切れるとクライアント接続も終了
	socket.on('end', function(){
		subscriber.unsubscribe(chat_room);
		subscriber.end();
		publisher.end();
	});


});

// チャットサーバーを起動
server.listen(3000);
