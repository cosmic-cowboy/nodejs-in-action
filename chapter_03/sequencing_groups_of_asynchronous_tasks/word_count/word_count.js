var fs = require('fs');

var completedTasks = 0;
// ファイル数分taskがつくられる
var tasks = [];
// すべてのファイルの文字のカウント数の合計が格納される
var wordCounts = {};
var filesDir = './text';

// ディレクトリにあるテキストファイルを読み込む
fs.readdir(filesDir, function(err, files){
	if(err){
		throw err;
	}
	// 読み込んだファイルに対しての処理を行う関数の定義を行うtasksに格納
	// console.log('ファイル数 : ' + files.length);
	for(var index in files){
		var task = serialProcess(filesDir + '/' + files[index]);
		tasks.push(task);
	}
	// 格納されたタスクを実行
	// console.log('タスク数 : ' + tasks.length);
	for(var taskIndex in tasks){
		tasks[taskIndex]();
	}
});


// 同期処理をまとめる
function serialProcess (file) {
	return function () {
		// 実行されたら、あとは非同期
		// console.log("start : " + file);
		fs.readFile(file, function (err, text) {
			if(err){
				throw err;
			}
			// テキストの読み込みと文字カウント
			countWordsInText(text);
			// console.log("finish : " + file);
			// タスクがすべて完了したかを確認
			checkIfComplete();
		});
	};
}

// テキストの読み込みと文字カウント
function countWordsInText (text) {
	var words = text.toString().toLowerCase().split(/\W+/).sort();
	for(var index in words){
		var word = words[index];
		if(word){
			wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
		}
	}
}

// タスクがすべて完了したかを確認
function checkIfComplete () {
	completedTasks++;
	if(completedTasks === tasks.length){
		for(var index in wordCounts){
			console.log(index + ': ' + wordCounts[index]);
		}
	}
}
