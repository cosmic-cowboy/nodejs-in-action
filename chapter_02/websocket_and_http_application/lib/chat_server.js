var socketio = require('socket.io');
var io;
var guestNumber = 1;

// ユーザのニックネーム
var nickNames = {};
// 使用済みゲスト名
var namesUsed = [];
var currentRoom = {};

//////////////////////
// 公開する関数
//////////////////////

exports.listen = function listen (server) {
	// Socket.IOサーバーを始動して既存のHTTPサーバーに相乗りさせる
	io = socketio.listen(server);

	io.set('log level', 1);

	io.sockets.on('connection', function (socket) {
		// ゲスト名の割り当て
		guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
		
		// 接続したユーザをロビーに入れる
		joinRoom(socket, 'Lobby');

		// ユーザの要求に応じて使用されているルームのリストを提供
		handleMessageBroadcasting(socket, nickNames);
		handleNameChangeAttempts(socket, nickNames, namesUsed);
		handleRoomJoining(socket);

		// 使用可能なルームリスト
		socket.on('rooms', function () {
			socket.emit('rooms', io.sockets.manager.room);
		});

		// ユーザが接続を断ったときにクリーンアップする
		handleClientDisconnection(socket, nickNames, nickNames);
	});
};

