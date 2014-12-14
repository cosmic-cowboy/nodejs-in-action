
// 非同期処理の定義
function asyncFunction (callback) {
	setTimeout(callback, 200);
}

var color = 'blue';

asyncFunction(function () {
	console.log('the color is ' + color);
});

var color = 'green';



