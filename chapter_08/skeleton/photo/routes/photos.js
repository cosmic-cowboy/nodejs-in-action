exports.list = function (req, res) {
	var photos = [];
	photos.push({
		name : "Green",
		path : "http://nodejs.org/images/logos/nodejs-green.png"
	});
	photos.push({
		name : "Black",
		path : "http://nodejs.org/images/logos/nodejs-black.png"
	});
	photos.push({
		name : "light",
		path : "http://nodejs.org/images/logos/nodejs.png"
	});
	photos.push({
		name : "dark",
		path : "http://nodejs.org/images/logos/nodejs-dark.png"
	});

	res.render('photos', {
		title  : 'Photos',
		photos : photos
	});
};