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