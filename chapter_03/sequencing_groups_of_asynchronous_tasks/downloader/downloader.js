var flow = require('nimble');
var exec = require('child_process').exec;

var versions = [];

// シリアル実行
flow.series([

	function (callback) {
		// パラレル実行
		flow.parallel([
			function (callback) {
				var version = '0.5.6';
				console.log('Downloading Node ' + version);
				versions.push(version);
				downloadNodeVersion(version, './tmp', callback);
			},
			function (callback) {
				var version = '0.5.7';
				console.log('Downloading Node ' + version);
				versions.push(version);
				downloadNodeVersion(version, './tmp', callback);
			}
		], callback);
	},
	function (callback) {
		console.log('Creating archive of downloaded files ... ');
		var tarFiles = '';
		for(var index in versions){
			tarFiles = ' ./tmp/' + versions[index] + ' ';
		}

		exec(
			'tar cvf node_distros.tar ' + tarFiles,
			function  (error, stdout, strerr) {
				console.log('All done!');
				callback();
			}
		);
	}
]);

// 指定したバージョンのソースをダウンロードして指定したディレクトリに配置する
function downloadNodeVersion (version, destination, callback) {
	var url = 'http://nodejs.org/dist/v' + version + '/node-v' + version + '.tar.gz';
	var filepath = destination + '/' + version + '.tgz';
	exec('curl ' + url + ' >' + filepath);
}