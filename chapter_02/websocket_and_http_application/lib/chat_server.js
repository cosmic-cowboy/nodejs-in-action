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

//////////////////////
// private 関数
//////////////////////

// ゲスト名の割り当て
function assignGuestName (socket, guestNumber, nickNames, namesUsed) {
	// ゲスト名を生成
	var name = 'Guest' + guestNumber;

	// ゲスト名とクライアントの接続IDを関連づける
	nickNames[socket.id] = name;

	// ユーザにゲスト名を知らせる
	socket.emit('nameResult',{
		success : true,
		name :name
	});

	// 使用済みゲスト名に登録
	namesUsed.push(name);

	// カウンターをインクリメント
	return guestNumber + 1;
}

// ルームへの参加
function joinRoom (socket, room) {
	// ユーザをルームに参加させる
	// TODO joinとは？
	socket.join(room);

	// ユーザがこのルームに参加したことを記録する
	currentRoom[socket.id] = room;

	// 新しいルームに入ったことを通知
	socket.emit('joinResult', {room : room});

	//　ルームにいるユーザに入室を通知
	socket.broadcast.to(room).emit('message', {
		text : nickNames[socket.id] + ' has joined ' + room + '.'
	});

	// ルームにいるユーザを取得
	var usersInRoom = io.sockets.clients(room);

	// 自分以外のユーザがいたら、概要を作成
	if(usersInRoom.length > 1){
		var usersInRoomSummary = 'Users currently in ' + room + ': ';
		for(var index in usersInRoom){
			var userSocketId = usersInRoom[index].id;
			if(userSocketId !== socket.id){
				if(index > 0){
					usersInRoomSummary += ', ';
				}
				usersInRoomSummary += nickNames[userSocketId];
			}
		}
		usersInRoomSummary += '.';
		socket.emit('message', {text : usersInRoomSummary});
	}

}

// 名前変更要求
function handleNameChangeAttempts(socket, nickNames, namesUsed){
	socket.on('nameAttempt', function (name) {
		// validate Guestからは始められない
		if(name.indexOf('Guest') === 0){
			socket.emit('nameResult',{
				success : false,
				message : 'Names cannot begin with "Guest"'
			});
		} else {
			if(namesUsed.indexOf(name) === -1){
				// namesUsedに登録されていない名前のみ登録処理を行う
				var previousName = nickNames[socket.id];
				var previousNameIndex = namesUsed.indexOf(previousName);

				// nickNames, namesUserd それぞれ変更する
				namesUsed.push(name);
				nickNames[socket.id] = name;
				delete namesUsed[previousNameIndex];

				socket.emit('nameResult',{
					success : true,
					name : name
				});

				socket.broadcast.to(currentRoom[socket.id]).emit('message', {
					text : previousName + ' is now knows as ' + name + '.'
				});

			} else {
				// validate すでに登録されているゲスト名
				socket.emit('nameResult',{
					success : false,
					message : 'That name is already in use.'
				});
			}
		}
	});
}

// チャットメッセージ送信
function handleMessageBroadcasting(socket, nickNames){
	socket.on('message', function (message) {
		socket.broadcast.to(message.room).emit('message', {
			text : nickNames[socket.id] + ': ' + message.text
		});
	});
}

// ルーム作成
function handleRoomJoining(socket){
	socket.on('join', function (room) {
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket, room.newRoom);
	});
}

// ユーザ接続断の処理
function handleClientDisconnection(socket){
	socket.on('disconnect', function () {
		var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		delete namesUsed[nameIndex];
		delete nickNames[socket.id];
	});
}



