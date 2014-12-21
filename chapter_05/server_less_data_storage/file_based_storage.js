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
		storeTasks(file, taskDescription);
	break;
	// タスク一覧を取得
	case 'list' :
		listTasks(file);
	break;
	default :
		console.log('Usage: ' + process.argv[1] + 'list | add [taskDescription]');
	break;
}