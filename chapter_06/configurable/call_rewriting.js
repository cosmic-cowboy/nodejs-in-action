var connect = require('connect');
var parse   = require('url').parse;
connect()
	.use(rewrite)
	.use(showPost)
	.use(hello)
	.listen(3000);

function showPost (req, res, next) {
	var path = parse(req.url).pathname;
	var match = path.match(/^\/blog\/posts\/(.+)/);
	if(match){
		if(match[1] === "1"){
			res.setHeader('Content-Type', 'text/plain');
			res.end('post data');
		}
	}
	next();
}
function rewrite (req, res, next) {
	var path = parse(req.url).pathname;
	var match = path.match(/^\/blog\/posts\/(.+)/);
	if(match){
		findPOstIdBySlug(match[1], function (err, id) {
			if(err){
				return next(err);
			}
			if(!id){
				return next(new Error('User not found'));
			}
			req.url = '/blog/posts/' + id;

			next();
		});
	} else {
		next();
	}
}

function findPOstIdBySlug (slug, callback) {
	var err;
	var id;
	// 本来はマップ
	if(slug === 'slug'){
		id = 1;
	} else if(slug === 'notid') {

	} else {
		err = new Error('slug not found');
	}


	callback(err, id);
}


// 応答するミドルウェア
// 
function hello (req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello world');
}