var fs  = require('fs');
var Watcher = require('./event_emitter_extend');

var watcher = new Watcher();

watcher.on('process', function process (file) {
	var watchFile = './watch/' + file;
	var processedFile = './done/' + file;

	fs.rename(watchFile, processedFile, function(err){
		if(err) throw err;
	});
	console.log("done file : " + file);
});

watcher.start();
