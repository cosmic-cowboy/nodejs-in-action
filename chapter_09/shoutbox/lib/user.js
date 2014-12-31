var redis = require('redis');
var bcrypt = require('bcrypt');
var db = redis.createClient();

module.exports = User;

function User (obj) {
	for (var key in obj){
		this[key] = obj[key];
	}
}

User.prototype.save = function(fn) {
	if(this.id){
		this.update(fn);
	} else {
		var user = this;
		db.incr('user:ids', function (err, id) {
			if(err) return fn(err);
			user.id = id;
			user.hashPassword(function (err) {
				if(err) return fn(err);
				user.update(fn);
			});
		});
	}
};

User.prototype.update = function(fn) {
	var user = this;
	var id = user.id;
	// 名前でユーザIDをインデックス参照
	db.set('user:id:' + user.name, id, function (err) {
		fn(err);
		// Redisのハッシュにデータを保存
		db.hmset('user:' + id, user, function (err) {
			fn(err);
		});
	});
};

// bcryptの暗号サポートをユーザーモデルに追加
User.prototype.hashPassword = function(fn) {
	var user = this;
	bcrypt.genSalt(12, function (err, salt) {
		if(err) return fn(err);
		user.salt = salt;
		bcrypt.hash(user.pass, salt, function (err, hash) {
			if(err) return fn(err);
			user.pass = hash;
			fn();
		});
	});
};