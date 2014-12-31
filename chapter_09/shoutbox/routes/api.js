var express = require('express');
var User = require('../lib/user');

exports.auth = express.basicAuth(User.authenticate);

exports.user = function () {
	
};

exports.entries = function () {
	
};

exports.add = function () {
	
};