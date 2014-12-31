var express = require('express');
var User = require('../lib/user');

exports.auth = express.basicAuth(User.authenticate);

exports.user = function (req, res, next) {
	User.get(req.param('id'), function (err, user) {
		if(err) return next(err);
		if(!user.id) return res.send(400);
		res.json(user);
	});
};

exports.entries = function (req, res, next) {
	
};

exports.add = function (req, res, next) {
	
};