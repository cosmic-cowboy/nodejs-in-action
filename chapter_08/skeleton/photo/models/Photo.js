var mongoose = require('mongoose');

var MongoDB = mongoose.connect('mongodb://localhost/photo_app').connection;

MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

var schema = new mongoose.Schema({
	name : String,
	path : String
});

// MongooseがCRUDのメソッドをモデルに提供する
// Photo.create, update, remove, find

module.exports = mongoose.model('Photo', schema);