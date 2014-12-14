var net = require('net');

var server = net.createServer(function (socket) {
	// socketはeventemitter
	// socketのonメソッドを利用してに、dataイベントのリスナを登録する
	// dataイベントはソケットに新しいデータが到着するたびemit（発行される）
	socket.on('data', function (data) {
		socket.write(data);
	});
});

server.listen(8888);