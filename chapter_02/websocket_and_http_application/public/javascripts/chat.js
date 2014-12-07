var Chat = function Chat (socket) {
	this.socket = socket;
};


// チャットメッセージ送信
Chat.prototype.sendMessage = function sendMessage(room, text) {
	var message = {
		room : room,
		text : text
	};

	this.socket.emit('message', message);
};


// チャットメッセージ送信
Chat.prototype.changeRoom = function changeRoom (room) {
	this.socket.emit('join',{
		newRoom : room
	});
};

// チャットコマンド
Chat.prototype.processCommand = function processCommand (input) {
	var words = input.split(' ');
	var command = words[0]
		.substring(1, words[0].length)
		.toLowerCase();

	var message = false;

	switch(command){
		case 'join' :
			words.shift();
			var room = words.join(' ');
			this.changeRoom(room);
			break;

		case 'nick' :
			words.shift();
			var name = words.join(' ');
			this.socket.emit('nameAttempt', name);
			break;

		default :
			message = 'Unrecognized command.';
			break;
	}
	
	return message;
};
