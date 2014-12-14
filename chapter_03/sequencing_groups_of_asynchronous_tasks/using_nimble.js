
var flow = require('nimble');

flow.series([

	function (callback) {
		setTimeout(function () {
			console.log('execute first');
			callback();
		}, 1000);
	},
	function (callback) {
		setTimeout(function () {
			console.log('execute second');
			callback();
		}, 500);
	},
	function (callback) {
		setTimeout(function () {
			console.log('execute third');
			callback();
		}, 100);
	},

]);

