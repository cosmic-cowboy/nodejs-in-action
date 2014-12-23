var connect = require('connect');

connect()
	.use(function hello(req, res) {
		foo();
		res.setHeader('Content-Type', 'text/plain');
		res.end('Hello, World');
	})
	.listen(3000);