var socket = io.connect();

$(document).ready(function () {
	var chatApp = new Chat(socket);

	// 各種イベントハンドリング

	// 名前変更リクエスト結果
	socket.on('nameResult', function (result) {
		var message;

		if(result.success){
			message = 'You are now known as ' + result.name + '.';
		} else {
			message = result.message;
		}

		$('#messages').append(divSystemContentElement(message));
	});

	// ルーム変更リクエスト結果
	socket.on('joinResult', function (result) {
		$('#room').text(result.room);
		$('#messages').append(divSystemContentElement('Room changed.'));
	});

	// 受信メッセージを表示
	socket.on('message', function (message) {
		var newElement = $('<div></div>').text(message.text);
		$('#messages').append(newElement);
	});

	// 利用できるルームリスト表示
	socket.on('rooms', function (rooms) {
		$('#room-list').empty();
		for(var room in rooms){
			room = room.substring(1, room.length);
			if(room !== ''){
				$('#room-list').append(divEscapedContentElement(room));
			}
		}
		// クリックしたルームに移動
		$('#room-list div').click(function () {
			chatApp.processCommand('/join ' + $(this).text());
			$('#send-message').focus();
		});
	});

	// 名前変更リクエスト結果
	socket.on('nameResult', function (result) {
	});

	// 利用できるルームのリストは周期的に問い合わせる
	setInterval(function(){
		socket.emit('rooms');
	}, 1000);

	$('#send-message').focus();

	// チャットメッセージ送信用フォーム
	$('#send-form').submit(function () {
		processUserInput(chatApp, socket);
		return false;
	});
});


//////////////////////
// ヘルパー関数
//////////////////////

// ユーザ入力のハンドリング
function processUserInput (chatApp, socket) {
	var message = $('#send-message').val();
	var systemMessage;

	if(message.charAt(0) === '/'){
		// 入力をコマンドとして扱う
		systemMessage = chatApp.processCommand(message);
		if(systemMessage){
			$('#messages').append(divSystemContentElement(systemMessage));
		}
	} else {
		// 入力をメッセージとして扱う
		chatApp.sendMessage($('#room').text(), message);
		$('#messages').append(divEscapedContentElement(message));
		$('#messages').scrollTop($('#messages')).prop('scrollHeight');
	}

	$('#send-message').val('');
}

// untrusted 信頼できないテキストデータ
// サニタイズ（sanitize）
function divEscapedContentElement (message) {
	return $('<div></div>').text(message);
}

// trusted 信頼できるテキストデータ
function divSystemContentElement (message) {
	return $('<div></div>').html('<i>' + message + '</i>');
}