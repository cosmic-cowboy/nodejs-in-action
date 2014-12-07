var fs = require('fs');

fs.readFile('resource/weather.json', function (er, data) {
	console.log(data);
});