console.log('b starting');
// falseに設定
exports.done = false;
// モジュールaを読み込み
var a = require('./a');
// モジュールaの値を確認
console.log('in b a.done=%j', a.done);
// trueに変更
exports.done = true;
console.log('b done');
