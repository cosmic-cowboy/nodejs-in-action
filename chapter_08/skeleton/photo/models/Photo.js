var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/photo_app');

var schema = new mongoose.Schema({
	name : String,
	path : String
});

// MongooseがCRUDのメソッドをモデルに提供する
// Photo.create, update, remove, find

module.exports = mongoose.model('Photo', schema);