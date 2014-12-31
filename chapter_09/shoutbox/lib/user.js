var redis = require('redis');
var bcrypt = require('bcrypt');
var db = redis.createClient();

module.exports = User;

function User (obj) {
	for (var key in obj){
		this[key] = obj[key];
	}
}

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

//////////////////////////
// ユーザ情報取得 関連処理
//////////////////////////

// ユーザのログイン認証
User.authenticate = function (name, pass, fn) {
	User.getByName(name, function (err, user) {
		// このエラー処理ってインジェクションで対応できないかな？
		if(err) return fn(err);
		if(!user.id) return fn();
		bcrypt.hash(pass, user.salt, function (err, hash) {
			if(err) return fn(err);
			if(hash === user.pass){
				return fn(null, user);
			}
			fn();
		});
	});
};


// ユーザ情報をRedisから取得
User.getByName = function(name, fn) {
	// ユーザIDを名前から検索
	User.getId(name, function (err, id) {
		if(err) return fn(err);
		User.get(id, fn);
	});
};

// ユーザIDを名前から検索
User.getId = function (name, fn) {
	// nameをインデックスとするIDを取得
	db.get('user:id:' + name, fn);
};

// nameをインデックスとするIDを取得
User.get = function (id, fn) {
	// オブジェクトのハッシュを取得
	db.hgetall('user:' + id, function (err, user) {
		if(err) return fn(err);
		fn(null, new User(user));
	});
};


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
