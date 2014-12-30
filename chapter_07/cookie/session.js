var connect = require('connect');
var cookieParser = require('cookie-parser');

connect()
	.use(cookieParser('tobi is a cool ferret'))
	.use(function hello(req, res) {
		console.log("req.cookies:");
		console.log(req.cookies);
		console.log("req.signedCookies:");
		console.log(req.signedCookies);
		res.end("Hello, World \n");

	}).listen(3000);
