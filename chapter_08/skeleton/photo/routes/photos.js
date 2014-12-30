var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

exports.list = function list(req, res) {
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
	Photo.find({}, function (err, photos) {
		if(err) return next(err);
		res.render('photos', {
			title  : 'Photos',
			photos : photos
		});
	});
};

exports.form = function form (req, res) {
	res.render('photos/upload', {
		title : '写真をアップロードしてください'
	});
};

exports.submit = function submit (dir) {
	return function (req, res, next) {
		// body: { photo: { name: 'sdfsdfsa' } },
		// files: 
		// { 'image': 
		// 	{ 
		// 		fieldname: 'photo[image]',
		// 		originalname: 'nodejs-green.png',
		// 		name: 'dbf2a9f99a00c2d5bfabc12b80bb4b7f.png',
		// 		encoding: '7bit',
		// 		mimetype: 'image/png',
		// 		path: 'upload/dbf2a9f99a00c2d5bfabc12b80bb4b7f.png',
		// 		extension: 'png',
		// 		size: 6588,
		// 		truncated: false,
		// 		buffer: null 
		// 	} 
		// }
		var img  = req.files.image;
		var name = req.body.photo.name || img.name;
		var path = join(dir, img.name);

		console.log(img.path);
		console.log(path);
		// fs.rename(img.path, path, function (err) {
			// if(err) return next(err);

			Photo.create({
				name : name,
				path : path
			}, function (err) {
				if(err) return next(err);
				res.redirect('/');
			});
		// });
	};
};