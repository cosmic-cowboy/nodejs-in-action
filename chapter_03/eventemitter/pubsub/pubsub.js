var events = require('events');

var net = require('net');

var channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};

////////////////////////
//     サーバー起動     //
////////////////////////

var server = net.createServer(function (client) {
	var id = client.remoteAddress + ':' + client.remotePort;

	// このコールバックがconnectイベントのリスナになっている
	// http://stackoverflow.com/questions/16903844/node-js-net-events-dont-fire
	//
	// ユーザがサーバーに接続したときjoinイベントを発行する
	// その際, idとclientを指定する
	console.log("id    : " + id);
	console.log("client: " + client);
	channel.emit('join', id, client);

	client.on('data', function (data) {
		data = data.toString();
		if(data === 'shutdown\r\n'){
			channel.emit('shutdown');
		}
		console.log("data: " + data);
		channel.emit('broadcast', id, data);
	});

	client.on('close', function () {
		channel.emit('leave', id);
	});
});


server.listen(8888);

////////////////////////
//     ヘルパー関数     //
////////////////////////

// join イベントのリスナ
channel.on('join', function (id, client) {
	console.log("call join");
	this.clients[id] = client;
	this.subscriptions[id] = function (senderId, message) {
		if(id != senderId){
			this.clients[id].write(message);
		}
	};
	this.on('broadcast', this.subscriptions[id]);
});

// shotdown イベントのリスナ
channel.on('shutdown', function () {
	channel.emit('broadcast', '', "Chat has shut down. \n");
	channel.removeAllListeners('broadcast');
});

// leave イベントのリスナ
channel.on('leave', function (id) {
	channel.removeListener(
		'broadcast', this.subscriptions[id]
	);
	channel.emit('broadcast', id, id + " has left the chat. \n");
});