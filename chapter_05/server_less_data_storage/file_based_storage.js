// 組み込みファイルシステム
var fs = require('fs');
// 組み込みパス解析
var path = require('path');

// processはグローバルオブジェクト
// コマンドライン引数を含む配列
// http://nodejs.jp/nodejs.org_ja/docs/v0.10/api/process.html#process_process_argv
var args = process.argv.splice(2);

// コマンドライン引数の3つ目がコマンドとなる
var command = args.shift();

// コマンドライン引数の4つ目以降はコマンドの引数となる
var taskDescription = args.join(' ');

// process.cwd()は
// プロセスのカレントワーキングディレクトリを返す
// カレントワーキングディレクトリにタスクリスト格納用ファイル
var file = path.join(process.cwd(), '/.tasks');

switch(command){
	// タスクを追加する
	case 'add' :
		addTasks(file, taskDescription);
	break;
	// タスク一覧を取得
	case 'list' :
		listTasks(file);
	break;
	default :
		console.log('Usage: ' + process.argv[1] + 'list | add [taskDescription]');
	break;
}

// タスクを追加する
function addTasks (file, taskDescription) {
	// ファイルがあればファイルに格納されたタスクリストの配列
	// ファイルがなければ空の配列
	// にtaskDescription（タスク）を追加し、
	// ファイルに書き込む
	loadOrInitializeTaskArray(file, function (tasks) {
		tasks.push(taskDescription);
		storeTasks(file, tasks);
	});
}

// タスク一覧を取得する
function listTasks (file) {
	// ファイルがあればファイルに格納されたタスクリストの配列
	// ファイルがなければ空の配列
	// をログ出力する
	loadOrInitializeTaskArray(file, function (tasks) {
		tasks.map(function (task) {
			console.log(task);
		});
	});
}

////////////////////////
////   ヘルパー関数   ////
////////////////////////

// ファイルの読み込み処理
// JSON形式でエンコードされたデータが保存されているテキストファイルをロードする
function loadOrInitializeTaskArray (file, callback) {
	fs.exists(file, function (exists) {
		var tasks = [];
		if(exists){
			// ファイルが存在すれば
			// ファイルを読み込み、JSON形式から配列に変換したタスクリストを
			// callback関数の引数に代入する
			fs.readFile(file, 'utf8', function (err, data) {
				if(err) throw err;
				var tasks = JSON.parse(data.toString() || '[]');
				callback(tasks);
			});
		} else {
			// ファイルが存在しなければ
			// 空の配列をcallback関数の引数に代入する
			callback([]);
		}
	});
}

// ファイルの書き込み処理
// 主にI/Oまわりを隠蔽している
// 呼び出し関数を変えれば、他のI/Oとのやり取りもできるようにしている
// ファイルにタスクを書き込む
function storeTasks (file, tasks) {
	// タスクの配列をJSON形式に変換して、ファイルに書き込む
	fs.writeFile(file, JSON.stringify(tasks), 'utf8', function (err) {
		if(err) throw err;
		console.log('Saved.');
	});
}