var redis = require('redis');
var bcrypt = require('bcrypt');
var db = redis.createClient();

module.exports = User;

function User (obj) {
	for (var key in obj){
		this[key] = obj[key];
	}
}