setTimeout(function () {
	console.log('execute first');
	setTimeout(function () {
		console.log('execute second');
		setTimeout(function () {
			console.log('execute third');
		}, 100);
	}, 500);
}, 1000);