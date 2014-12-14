console.log('a starting');
// falseに設定
exports.done = false;
// モジュールaを読み込み
var b = require('./b');
// モジュールaの値を確認
console.log('in a b.done=%j', b.done);
// trueに変更
exports.done = true;
console.log('a done');
